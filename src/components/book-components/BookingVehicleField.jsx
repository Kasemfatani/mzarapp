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
import Image from "next/image";

export function BookingVehicleField({
	form,
	name = "vehicle",
	id,
	placeholder,
	vehicles = [],
	language = "en",
	className = "",
}) {
	const isAr = language === "ar";
	let justifyClass = isAr ? "justify-end" : "justify-between";
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem className={className}>
					<FormControl>
						<Select
							onValueChange={(id) => {
								const selected = vehicles.find(
									(item) => String(item.id) === String(id)
								);
								// set the whole object so form values include web_price, seats, etc.
								field.onChange(selected || null);
							}}
							value={field.value?.id ? String(field.value.id) : ""}
						>
							<SelectTrigger className={`w-full select-trigger ${justifyClass} px-2`} id={id || name}>
								<SelectValue
									placeholder={
										placeholder ||
										(language === "ar" ? "اختر نوع المركبة" : "Select Vehicle")
									}
								/>
							</SelectTrigger>
							<SelectContent>
								{vehicles.map((item) => (
									<SelectItem key={item.id} value={String(item.id)} disabled={!item.is_enabled} className={justifyClass}>
										{item.image && (
											<Image
												src={item.image}
												alt={item.name}
												width={28}
												height={18}
												className="inline-block mr-2 object-contain"
											/>
										)}
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
