import { type MapStyleId, mapStyleOptions } from "@/lib/maptilerStyles";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

export type MapStyleSelectorProps = Readonly<{
	mapStyle: MapStyleId;
	setMapStyle: (mapStyle: MapStyleId) => void;
}>;

export default function MapStyleSelector({
	mapStyle,
	setMapStyle,
}: MapStyleSelectorProps) {
	const handleSetMapStyle = (value: MapStyleId) => {
		if (value === mapStyle) return;
		setMapStyle(value);
	};

	return (
		<div className="flex-center gap-4">
			<p className="text-subtle text-sm">Select Map Style:</p>
			<Select value={mapStyle} onValueChange={handleSetMapStyle}>
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
						{mapStyleOptions.map((style) => (
							<SelectItem key={style.id} value={style.id}>
								{style.label}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}
