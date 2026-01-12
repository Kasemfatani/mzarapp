"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function DetailedPolicy({ isAr }) {
	const [openId, setOpenId] = useState("1");

	const toggleItem = (id) => {
		setOpenId(openId === id ? null : id);
	};

	const policyItems = [
		{
			id: "1",
			question: isAr ? "متى يمكنني الإلغاء؟" : "When can I cancel?",
			answer: isAr
				? "يمكنك إلغاء الحجز قبل موعد الرحلة بساعتين على الأقل دون أي رسوم إضافية، وسيتم استرجاع المبلغ كاملاً عبر نفس وسيلة الدفع المستخدمة."
				: "You may cancel your booking at least 2 hours before the experience with no additional fees, and you will receive a full refund via the same payment method used.",
		},
		{
			id: "2",
			question: isAr
				? "ماذا يحدث إذا ألغيت متأخراً؟"
				: "What happens if I cancel late?",
			answer: isAr
				? "إذا تم الإلغاء قبل موعد الرحلة بأقل من ساعتين، يتم خصم 25% من قيمة الرحلة.\n\nأما في حال تم الإلغاء بعد انطلاق السائق أو بدء الرحلة، فيُخصم 100% من قيمة الرحلة ولا يتم استرجاع المبلغ."
				: "Less than 2 hours: 25% deduction\n\nAfter the driver departs or experience begins: 100% deduction",
		},
		{
			id: "3",
			question: isAr
				? "هل توجد تجارب غير قابلة للإلغاء؟"
				: "Are there non-refundable experiences?",
			answer: isAr
				? "نعم، بعض التجارب أو العروض الخاصة (مثل العروض الموسمية أو الخصومات المسبقة) قد تكون غير قابلة للإلغاء أو الاسترداد، ويتم توضيح ذلك بوضوح عند الحجز."
				: "Yes. Some special offers or seasonal promotions may be non-refundable, clearly stated during booking.",
		},
		{
			id: "4",
			question: isAr
				? "كم يستغرق استرجاع المبلغ بعد الإلغاء؟"
				: "How long does the refund take?",
			answer: isAr
				? "تتم عملية الاسترجاع خلال 3 إلى 14 يوم عمل حسب البنك أو مزود خدمة الدفع المستخدم عند الحجز."
				: "3 to 14 business days, depending on the bank or payment provider.",
		},
		{
			id: "5",
			question: isAr
				? "هل يمكنني تعديل الحجز بدلاً من الإلغاء؟"
				: "Can I modify instead of cancel?",
			answer: isAr
				? "نعم، يمكنك تعديل موعد الرحلة أو عدد الأشخاص قبل 12 ساعة من الموعد دون رسوم إضافية، وذلك بحسب توفر الجولات في التوقيت الجديد."
				: "Yes. You may modify the date or number of participants up to 12 hours before the experience, subject to availability.",
		},
		{
			id: "6",
			question: isAr
				? "ماذا يحدث إذا ألغت مزار التجربة؟"
				: "What if Mzar cancels the experience?",
			answer: isAr
				? "في حال تم الإلغاء من قِبل مزار لأي سبب (مثل الظروف الجوية أو الأسباب التشغيلية)، سيتم استرجاع المبلغ كاملاً أو يُمنح العميل خيار إعادة الجدولة في وقت لاحق."
				: "If Mzar cancels the experience for any reason (such as weather conditions or operational reasons), a full refund will be issued, or the customer may choose to reschedule for a later time.",
		},
		{
			id: "7",
			question: isAr
				? "هل يمكنني إلغاء جزء من الحجز فقط؟"
				: "Partial cancellation?",
			answer: isAr
				? "نعم، يمكنك طلب إلغاء جزئي (مثل إلغاء أحد الأفراد في الحجز الجماعي)، وسيتم احتساب المبلغ المستحق بناءً على الجزء المُلغى وفق سياسة الإلغاء المعتمدة."
				: "Partial cancellations are allowed (e.g., one person from a group), calculated according to policy.",
		},
		{
			id: "8",
			question: isAr
				? "ماذا لو لم أستطع حضور التجربة بسبب ظرف طارئ؟"
				: "What if I cannot attend due to an emergency?",
			answer: isAr
				? "يمكنك التواصل مع فريق الدعم عبر مركز المساعدة لبحث إمكانية إعادة الجدولة أو استرداد جزئي وفق نوع الرحلة وحالتها."
				: "You can contact the support team through the help center to discuss the possibility of rescheduling or a partial refund depending on the trip type and status.",
		},
		{
			id: "9",
			question: isAr
				? "هل توجد استثناءات في حالات الطوارئ؟"
				: "Are there exceptions in emergencies?",
			answer: isAr
				? "نعم، في الظروف الطارئة أو الحالات الخاصة، يمكن تقديم استثناءات من سياسة الإلغاء بناءً على تقدير إدارة مزار، مع مراعاة مصلحة العميل."
				: "Yes, in emergency or special circumstances, exceptions to the cancellation policy may be granted at Mzar’s discretion, keeping the customer’s interest in mind.",
		},
		{
			id: "10",
			question: isAr
				? "هل تُسترد الرسوم الإدارية؟"
				: "Are administrative fees refundable?",
			answer: isAr
				? "الرسوم الإدارية (إن وُجدت) تُسترد فقط إذا تم الإلغاء من طرف مزار أو في حال لم تبدأ إجراءات تنفيذ الرحلة."
				: "Administrative fees (if any) are refundable only if Mzar cancels the experience or if the experience has not yet started.",
		},
	];

	return (
		<section className="bg-[#f5f2ed] py-20 md:py-32">
			<div className="container mx-auto max-w-5xl px-6 lg:px-8">
				<div className="mb-16 text-center">
					<h2 className="mb-4 text-4xl text-[#0d5940] md:text-5xl">
						{isAr ? "التفاصيل الكاملة" : "Detailed Information"}
					</h2>
					<p className="mx-auto max-w-2xl text-xl text-[#718096]">
						{isAr
							? "كل ما تحتاج معرفته عن سياسة الحجز والإلغاء"
							: "Everything you need to know about the booking and cancellation policy"}
					</p>
				</div>

				<div className="space-y-4">
					{policyItems.map((item) => {
						const isOpen = openId === item.id;
						return (
							<div
								key={item.id}
								className="overflow-hidden rounded-3xl border-2 border-transparent bg-white transition-all duration-300 hover:border-[#c9a961] hover:shadow-lg"
							>
								<button
									onClick={() => toggleItem(item.id)}
									className="flex w-full items-start justify-between gap-6 px-8 py-6 text-start"
								>
									<h3 className="flex-1 text-2xl text-[#0d5940]">
										{item.question}
									</h3>
									<motion.div
										animate={{ rotate: isOpen ? 180 : 0 }}
										transition={{ duration: 0.3, ease: "easeInOut" }}
										className="flex-shrink-0"
									>
										<ChevronDown
											className="h-7 w-7 text-[#c9a961]"
											strokeWidth={2.5}
										/>
									</motion.div>
								</button>

								<AnimatePresence initial={false}>
									{isOpen && (
										<motion.div
											initial={{ height: 0, opacity: 0 }}
											animate={{ height: "auto", opacity: 1 }}
											exit={{ height: 0, opacity: 0 }}
											transition={{ duration: 0.3, ease: "easeInOut" }}
										>
											<div className="border-t-2 border-[#f5f2ed] px-8 pb-8 pt-6">
												<p className="text-xl leading-relaxed text-[#4a5568]">
													{item.answer}
												</p>
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
