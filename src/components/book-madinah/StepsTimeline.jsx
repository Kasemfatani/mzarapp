import React from "react";
import { CalendarDays, UserRound, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StepsTimeline({ t, isAr, className }) {
	return (
		<aside
			className={cn(
				"p-1 md:p-6",
				// Horizontal on small screens, vertical on md+
				"flex flex-row md:flex-col items-center justify-center",
				"md:me-4 md:border-e",
				className
			)}
			aria-label="steps"
		>
			{/* Active step (Choose Tour) */}
			<div className="flex flex-col-reverse md:flex-col items-center gap-3 md:gap-0">
				<div className="text-[13px] font-semibold text-[var(--main-color,#14532d)] text-center">
					{t.steps.choose}
				</div>
				<div className="mt-2 h-9 w-9 rounded-full border-2 border-[var(--main-color,#14532d)] text-[var(--main-color,#14532d)] grid place-items-center">
					<CalendarDays className="h-5 w-5" />
				</div>
			</div>

			{/* Connector - horizontal on small, vertical on md+ */}
			<div className="mx-2 w-10 h-px border-t-2 border-dotted border-gray-400 md:mx-0 md:my-2 md:w-px md:h-10 md:border-t-0 md:border-l-2" />

			{/* Upcoming: Info */}
			<div className="flex flex-col items-center gap-2 text-muted-foreground w-16 md:w-auto">
				<div className="h-9 w-9 rounded-full border-2 border-gray-300 text-gray-400 grid place-items-center ">
					<UserRound className="h-5 w-5" />
				</div>
				<div className="text-[13px] text-center">{t.steps.info}</div>
			</div>

			{/* Connector - horizontal on small, vertical on md+ */}
			<div className="mx-2 w-10 h-px border-t-2 border-dotted border-gray-400 md:mx-0 md:my-2 md:w-px md:h-10 md:border-t-0 md:border-l-2" />

			{/* Upcoming: Payment */}
			<div className="flex flex-col items-center gap-2 text-muted-foreground ">
				<div className="h-9 w-9 rounded-full border-2 border-gray-300 text-gray-400 grid place-items-center">
					<CreditCard className="h-5 w-5" />
				</div>
				<div className="text-[13px] text-center">{t.steps.pay}</div>
			</div>
		</aside>
	);
}
