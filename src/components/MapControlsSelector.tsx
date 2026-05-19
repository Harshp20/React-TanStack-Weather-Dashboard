import type { MapStyleId } from "@/lib/maptilerStyles";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

export type MapStyleSelectorProps<T extends string> = Readonly<{
	label: string;
	selectedControl: T;
	controlOptions: Readonly<
		{
			id: string;
			title: string;
			[key: string]: unknown;
		}[]
	>;
	setControl: (control: T) => void;
}>;

export default function MapControlsSelector<T extends string>({
	label,
	selectedControl,
	controlOptions,
	setControl: setMapStyle,
}: MapStyleSelectorProps<T>) {
	const handleSetMapStyle = (value: MapStyleId) => {
		if (value === selectedControl) return;
		setMapStyle(value as T);
	};

	return (
		<div className="flex-center gap-4">
			<p className="text-subtle text-sm">{`${label}:`}</p>
			<Select value={selectedControl} onValueChange={handleSetMapStyle}>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Style" />
				</SelectTrigger>
				<SelectContent
					position="popper"
					sideOffset={4}
					side="top"
					className="z-1100"
				>
					<SelectGroup>
						{controlOptions.map((option) => (
							<SelectItem key={option.id} value={option.id}>
								{option.title}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}
