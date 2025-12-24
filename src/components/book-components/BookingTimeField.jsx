import {
	FormField,
	FormItem,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";

export function BookingTimeField({
	form,
	name = "time",
	placeholder,
	bookingHours = [],
	language = "en",
	className = "",
}) {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem className={className}>
					<FormControl>
						<Select
							onValueChange={(id) => {
								const selected = bookingHours.find(
									(item) => String(item.id) === String(id)
								);
								field.onChange(
									selected ? { id: selected.id, name: selected.name } : null
								);
							}}
							value={field.value?.id ? String(field.value.id) : ""}
						>
							<SelectTrigger className="w-full select-trigger">
								<SelectValue
									placeholder={
										placeholder ||
										(language === "ar" ? "اختر الوقت" : "Select Time")
									}
								/>
							</SelectTrigger>
							<SelectContent>
								{bookingHours?.map((item) => (
									<SelectItem key={item.id} value={String(item.id)}>
										<span>{item.name}</span>
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
