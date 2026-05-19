import { useState } from "react";
import { DEFAULT_MAP_STYLE_ID, type MapStyleId } from "@/lib/maptilerStyles";
import type { Coords } from "@/types";
import CurrentWeather from "./CurrentWeather";
import MapLayerSelector, { type MapLayerKey } from "./MapLayerSelector";
import MapStyleSelector from "./MapStyleSelector";
import MapWrapper from "./MapWrapper";

export type { MapStyleId };

export type MainMapProps = Readonly<{
	coords: Coords;
	handleSetCoordinates: (coords: Coords) => void;
}>;

export default function MainMap({
	coords,
	handleSetCoordinates,
}: MainMapProps) {
	const [mapLayer, setMapLayer] = useState<MapLayerKey>("precipitation_new");
	const [mapStyle, setMapStyle] = useState<MapStyleId>(DEFAULT_MAP_STYLE_ID);

	return (
		<div className="grid grid-cols-[1fr_2fr] gap-6">
			<CurrentWeather coords={coords} />
			<div className="flex flex-col gap-4">
				<div className="flex justify-end gap-4">
					<MapLayerSelector mapLayer={mapLayer} setMapLayer={setMapLayer} />
					<MapStyleSelector mapStyle={mapStyle} setMapStyle={setMapStyle} />
				</div>
				<MapWrapper
					coords={coords}
					onMapClick={handleSetCoordinates}
					mapLayer={mapLayer}
					mapStyle={mapStyle}
				/>
			</div>
		</div>
	);
}
