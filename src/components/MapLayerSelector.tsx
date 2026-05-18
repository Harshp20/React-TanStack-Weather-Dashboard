import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const mapLayers = [
	{ key: "precipitation_new", title: "Precipitation" },
	{ key: "clouds_new", title: "Clouds" },
	{ key: "pressure_new", title: "Pressure" },
	{ key: "wind_new", title: "Wind" },
	{ key: "temp_new", title: "Temperature" },
] as const;

export type MapLayerKey = (typeof mapLayers)[number]["key"];
export type MapLayerSelectorProps = Readonly<{
	mapLayer: MapLayerKey;
	setMapLayer: (mapLayer: MapLayerKey) => void;
}>;

export default function MapLayerSelector({
	mapLayer,
	setMapLayer,
}: MapLayerSelectorProps) {
	const handleSetMapLayer = (value: MapLayerKey) => {
		if (value === mapLayer) return;
		setMapLayer(value);
	};

	return (
		<div className="flex-center gap-4 self-end">
			<p className="text-subtle">Select Map Layer:</p>
			<Select value={mapLayer} onValueChange={handleSetMapLayer}>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Layer" />
				</SelectTrigger>
				<SelectContent
					position="popper"
					sideOffset={4}
					side="top"
					className="z-1100"
				>
					<SelectGroup>
						{mapLayers.map((layer) => (
							<SelectItem key={layer.key} value={layer.key}>
								{layer.title}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}
