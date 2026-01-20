"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
	FormField,
	FormItem,
	FormMessage,
	FormControl,
} from "@/components/ui/form";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export function DatePickerFormField({
	form,
	name = "date",
	id,
	label,
	lang = "ar",
	minDate,
	maxDate,
	disabledDays = [0, 1],
}) {
	const isAr = lang === "ar";
	const [open, setOpen] = useState(false);
	return (
		<div className="flex flex-col gap-2">
			<label className="flex items-center text-[#364153]">
				{label || (isAr ? "اختر التاريخ المناسب" : "Pick a date")}
			</label>
			<FormField
				control={form.control}
				name={name}
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Popover open={open} onOpenChange={setOpen}>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										className="w-full justify-start text-start bg-white rounded-md border p-3"
										type="button"
										id={id || name}
									>
										<CalendarIcon className="mr-2 h-4 w-4" />
										{field.value
											? format(field.value, "PPP")
											: isAr
												? "اختر التاريخ"
												: "Pick a date"}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0">
									<div className="p-3">
										<Calendar
											mode="single"
											selected={field.value || undefined}
											onSelect={(date) => {
												field.onChange(date || null);
												setOpen(false);
											}}
											fromDate={minDate}
											toDate={maxDate}
											disabled={[
												{ before: minDate },
												{ after: maxDate },
												{ dayOfWeek: disabledDays },
											]}
											numberOfMonths={1}
										/>
									</div>
								</PopoverContent>
							</Popover>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);
}
