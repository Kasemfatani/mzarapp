"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, Clipboard, LoaderCircle, XCircle } from "lucide-react";
import {
	NATIONAL_DAY_FINALIZED_PREFIX,
	NATIONAL_DAY_FINALIZING_PREFIX,
	NATIONAL_DAY_SESSION_PREFIX,
} from "@/lib/nationalDayBookingConstants";
import pageStyles from "./NationalDayPage.module.css";
import styles from "./NationalDaySuccess.module.css";

const wait = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration));
const finalizationJobs = new Map();

async function runFinalization(cartId, stored) {
	const inProgressKey = `${NATIONAL_DAY_FINALIZING_PREFIX}${cartId}`;
	let transactionId = "";

	try {
		for (let attemptNumber = 0; attemptNumber < 4; attemptNumber += 1) {
			localStorage.setItem(inProgressKey, JSON.stringify({ started_at: Date.now() }));
			let response;
			let body;
			try {
				response = await fetch("/api/national-day/finalize", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(stored),
				});
				body = await response.json().catch(() => null);
			} catch {
				return { view: "uncertain", transactionId };
			}

			transactionId = body?.transaction_id || transactionId;
			if (transactionId) {
				localStorage.setItem(
					inProgressKey,
					JSON.stringify({ started_at: Date.now(), transaction_id: transactionId }),
				);
			}

			if (response.ok && body?.status === true) {
				localStorage.setItem(`${NATIONAL_DAY_FINALIZED_PREFIX}${cartId}`, JSON.stringify(body));
				localStorage.removeItem(inProgressKey);
				return { view: "success", result: body, transactionId: body.transaction_id || "" };
			}

			if (body?.code === "payment_pending") {
				localStorage.removeItem(inProgressKey);
				if (attemptNumber < 3) {
					await wait(2000);
					continue;
				}
				return { view: "pending", transactionId };
			}

			if (["payment_failed", "payment_verification_unavailable", "payment_details_mismatch", "invalid_booking_session", "invalid_or_expired_booking_session"].includes(body?.code)) {
				localStorage.removeItem(inProgressKey);
			}

			if (body?.code === "payment_failed") {
				return { view: "payment-failed", transactionId };
			}
			if (["booking_confirmation_failed", "booking_confirmation_unknown"].includes(body?.code)) {
				return { view: "booking-failed", transactionId };
			}
			if (["payment_verification_unavailable", "payment_details_mismatch", "invalid_booking_session", "invalid_or_expired_booking_session"].includes(body?.code)) {
				return { view: "verification-failed", transactionId };
			}

			// The booking request may have reached the API; retain the lock to prevent replay.
			return { view: "uncertain", transactionId };
		}
	} catch {
		// If browser storage fails, show a support state rather than claiming success.
		return { view: "uncertain", transactionId };
	}

	return { view: "uncertain", transactionId };
}

function getFinalizationJob(cartId, stored) {
	const existing = finalizationJobs.get(cartId);
	if (existing) return existing;

	const job = runFinalization(cartId, stored);
	finalizationJobs.set(cartId, job);
	job.then(() => {
		if (finalizationJobs.get(cartId) === job) finalizationJobs.delete(cartId);
	});
	return job;
}

export default function NationalDaySuccess({ content, lang }) {
	const { success } = content;
	const [view, setView] = useState("checking");
	const [session, setSession] = useState(null);
	const [result, setResult] = useState(null);
	const [transactionId, setTransactionId] = useState("");
	const [copied, setCopied] = useState(false);
	const [retryCount, setRetryCount] = useState(0);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const cartId = params.get("cart_id") || "";
		if (!cartId) {
			setView("missing");
			return;
		}

		let stored;
		try {
			stored = JSON.parse(localStorage.getItem(`${NATIONAL_DAY_SESSION_PREFIX}${cartId}`) || "null");
		} catch {
			stored = null;
		}

		if (!stored?.session || stored.session.cart_id !== cartId || !stored.signature) {
			setView("missing");
			return;
		}
		setSession(stored);

		try {
			const completed = JSON.parse(localStorage.getItem(`${NATIONAL_DAY_FINALIZED_PREFIX}${cartId}`) || "null");
			if (completed?.status === true) {
				setResult(completed);
				setTransactionId(completed.transaction_id || "");
				setView("success");
				return;
			}
		} catch {
			// An unreadable local completion record must not block server verification.
		}

		const inProgressKey = `${NATIONAL_DAY_FINALIZING_PREFIX}${cartId}`;
		const applyOutcome = (outcome) => {
			setResult(outcome.result || null);
			setTransactionId(outcome.transactionId || "");
			setView(outcome.view);
		};

		const existingJob = finalizationJobs.get(cartId);
		if (existingJob) {
			setView("checking");
			let active = true;
			existingJob.then((outcome) => {
				if (active) applyOutcome(outcome);
			});
			return () => {
				active = false;
			};
		}

		const priorAttempt = localStorage.getItem(inProgressKey);
		if (priorAttempt) {
			try {
				const attempt = JSON.parse(priorAttempt);
				setTransactionId(attempt.transaction_id || "");
			} catch {
				// Keep the support state even if the marker is malformed.
			}
			setView("uncertain");
			return;
		}

		setView("checking");
		let active = true;
		getFinalizationJob(cartId, stored).then((outcome) => {
			if (active) applyOutcome(outcome);
		});
		return () => {
			active = false;
		};
	}, [retryCount]);

	const copyTransaction = async () => {
		if (!transactionId) return;
		try {
			await navigator.clipboard.writeText(transactionId);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1600);
		} catch {
			setCopied(false);
		}
	};

	const retryVerification = () => {
		setRetryCount((count) => count + 1);
	};

	const returnHref = `/${lang}/special-day#booking`;
	const supportHref = `https://wa.me/966580121025?text=${encodeURIComponent(
		lang === "ar"
			? `أحتاج إلى مساعدة بشأن حجز العرض الخاص. رقم العملية: ${transactionId || "غير متوفر"}. مرجع الطلب: ${session?.session?.cart_id || "غير متوفر"}.`
			: `I need help with my special offer booking. Transaction: ${transactionId || "unavailable"}. Cart reference: ${session?.session?.cart_id || "unavailable"}.`,
	)}`;

	const contentByView = {
		"payment-failed": {
			title: success.paymentFailedTitle,
			copy: success.paymentFailedCopy,
			icon: XCircle,
			tone: "warning",
		},
		pending: {
			title: success.pendingTitle,
			copy: success.pendingCopy,
			icon: AlertTriangle,
			tone: "warning",
		},
		"booking-failed": {
			title: success.bookingFailedTitle,
			copy: success.bookingFailedCopy,
			icon: AlertTriangle,
			tone: "warning",
		},
		"verification-failed": {
			title: success.verificationFailedTitle,
			copy: success.verificationFailedCopy,
			icon: AlertTriangle,
			tone: "warning",
		},
		uncertain: {
			title: success.verificationFailedTitle,
			copy: success.verificationFailedCopy,
			icon: AlertTriangle,
			tone: "warning",
		},
		missing: {
			title: success.missingDataTitle,
			copy: success.missingDataCopy,
			icon: AlertTriangle,
			tone: "warning",
		},
	};

	if (view === "checking") {
		return (
			<section className={`${styles.successPage} ${pageStyles.container}`} aria-live="polite">
				<div className={`${styles.resultCard} ${styles.checkingCard}`}>
					<LoaderCircle className={`${styles.statusIcon} ${styles.spin}`} aria-hidden="true" size={48} />
					<h1>{success.checkingTitle}</h1>
					<p>{success.checkingCopy}</p>
				</div>
			</section>
		);
	}

	const isSuccess = view === "success";
	const displayed = isSuccess
		? { title: success.confirmedTitle, copy: success.confirmedCopy, icon: CheckCircle2, tone: "success" }
		: contentByView[view] || contentByView.missing;
	const StatusIcon = displayed.icon;
	const bookingData = result?.data || {};

	return (
		<section className={`${styles.successPage} ${pageStyles.container}`}>
			<div className={`${styles.resultCard} ${displayed.tone === "success" ? styles.successCard : styles.warningCard}`}>
				<span className={styles.statusIconWrap}>
					<StatusIcon className={styles.statusIcon} aria-hidden="true" size={48} />
				</span>
				<h1>{displayed.title}</h1>
				<p className={styles.resultCopy}>{displayed.copy}</p>

				{session?.session && view !== "missing" && view !== "payment-failed" && (
					<div className={styles.bookingDetails}>
						<div className={styles.detailRow}><span>{success.quantity}</span><strong>{session.session.quantity}</strong></div>
						<div className={styles.detailRow}><span>{success.total}</span><strong>{session.session.amount} {lang === "ar" ? "ريالًا" : "SAR"}</strong></div>
						{transactionId && (
							<div className={styles.transactionRow}>
								<span>{success.transaction}</span>
								<code dir="ltr">{transactionId}</code>
								<button type="button" onClick={copyTransaction} aria-label={success.copy}>
									<Clipboard aria-hidden="true" size={17} />
									{copied ? success.copied : success.copy}
								</button>
							</div>
						)}
						{view === "uncertain" && !transactionId && (
							<div className={styles.detailRow}><span>{lang === "ar" ? "مرجع الطلب" : "Order reference"}</span><code dir="ltr">{session.session.cart_id}</code></div>
						)}
						{isSuccess && bookingData.trip_id && <div className={styles.detailRow}><span>{success.tripId}</span><strong>{bookingData.trip_id}</strong></div>}
						{isSuccess && bookingData.customer_id && <div className={styles.detailRow}><span>{success.customerId}</span><strong>{bookingData.customer_id}</strong></div>}
						{isSuccess && bookingData.process_id && <div className={styles.detailRow}><span>{success.processId}</span><strong>{bookingData.process_id}</strong></div>}
					</div>
					)}

				<div className={styles.actions}>
					{view === "pending" && (
						<button className={styles.primaryAction} type="button" onClick={retryVerification}>
							{lang === "ar" ? "التحقق مرة أخرى" : "Check again"}
						</button>
					)}
					{view !== "success" && view !== "payment-failed" && (
						<a className={styles.supportAction} href={supportHref} target="_blank" rel="noopener noreferrer">
							{success.contact}
						</a>
					)}
					<a className={styles.returnAction} href={returnHref}>{success.back}</a>
				</div>
			</div>
		</section>
	);
}
