import React from "react";
import { CalendarDays, UserRound, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Step 2 timeline: both step 1 (Choose Tour) and step 2 (Info) are highlighted.
 */
export default function StepsTimelineInfo({ t, className }) {
	return (
		<aside
			className={cn(
				"p-4 md:p-6 flex flex-col items-center ",
				className
			)}
			aria-label="steps"
		>
			{/* Step 1: Choose Tour - active */}
			<div className="flex flex-col items-center">
				<div className="text-[13px] font-semibold text-[var(--main-color,#14532d)]">
					{t.steps.choose}
				</div>
				<div className="mt-2 h-9 w-9 rounded-full border-2 border-[var(--main-color,#14532d)] text-[var(--main-color,#14532d)] grid place-items-center">
					<CalendarDays className="h-5 w-5" />
				</div>
			</div>

			{/* Connector */}
			<div className="my-2 h-10 w-px border-l-2 border-dotted border-[var(--main-color,#14532d)]/50" />

			{/* Step 2: Personal Info - active too */}
			<div className="flex flex-col items-center">
				<div className="text-[13px] font-semibold text-[var(--main-color,#14532d)]">
					{t.steps.info}
				</div>
				<div className="mt-2 h-9 w-9 rounded-full border-2 border-[var(--main-color,#14532d)] text-[var(--main-color,#14532d)] grid place-items-center">
					<UserRound className="h-5 w-5" />
				</div>
			</div>

			{/* Connector */}
			<div className="my-2 h-10 w-px border-l-2 border-dotted border-gray-300" />

			{/* Step 3: Payment - upcoming */}
			<div className="flex flex-col items-center gap-2 text-muted-foreground opacity-60">
				<div className="h-9 w-9 rounded-full border-2 border-gray-300 text-gray-400 grid place-items-center">
					<CreditCard className="h-5 w-5" />
				</div>
				<div className="text-[13px]">{t.steps.pay}</div>
			</div>
		</aside>
	);
}
