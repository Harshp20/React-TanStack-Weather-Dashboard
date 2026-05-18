import { useState } from "react";
import type { Coords } from "@/types";
import CurrentWeather from "./CurrentWeather";
import MapLayerSelector, { type MapLayerKey } from "./MapLayerSelector";
import MapWrapper from "./MapWrapper";

export type MainMapProps = Readonly<{
	coords: Coords;
	handleSetCoordinates: (coords: Coords) => void;
}>;
export default function MainMap({
	coords,
	handleSetCoordinates,
}: MainMapProps) {
	const [mapLayer, setMapLayer] = useState<MapLayerKey>("precipitation_new");
	return (
		<div className="grid grid-cols-[1fr_2fr] gap-6">
			<CurrentWeather coords={coords} />
			<div className="flex flex-col gap-4">
				<MapLayerSelector mapLayer={mapLayer} setMapLayer={setMapLayer} />
				<MapWrapper
					coords={coords}
					onMapClick={handleSetCoordinates}
					mapLayer={mapLayer}
				/>
			</div>
		</div>
	);
}
