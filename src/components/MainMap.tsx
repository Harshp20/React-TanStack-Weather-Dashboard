import { Suspense, useState } from "react";
import CurrentWeatherSkeleton from "@/components/skeletons/CurrentWeatherSkeleton";
import { mapLayers } from "@/constants/mapLayerOptions";
import { useTheme } from "@/hooks/useTheme";
import {
	DEFAULT_DARK_MAP_STYLE_ID,
	DEFAULT_LIGHT_MAP_STYLE_ID,
	type MapStyleId,
	mapStyleOptions,
} from "@/lib/maptilerStyles";
import type { Coords } from "@/types";
import type { MapLayerKey } from "../types";
import CurrentWeather from "./CurrentWeather";
import MapControlsSelector from "./MapControlsSelector";
import MapErrorBoundary from "./MapErrorBoundary";
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
	const { resolvedTheme } = useTheme();
	const themeMapStyle: MapStyleId =
		resolvedTheme === "dark"
			? DEFAULT_DARK_MAP_STYLE_ID
			: DEFAULT_LIGHT_MAP_STYLE_ID;
	const [mapStyleOverride, setMapStyleOverride] = useState<MapStyleId | null>(
		null,
	);
	const selectedMapStyle = mapStyleOverride ?? themeMapStyle;

	const [selectedMapLayer, setSelectedMapLayer] =
		useState<MapLayerKey>("precipitation_new");

	return (
		<section className="flex min-w-0 flex-col gap-4 lg:gap-6">
			{/* Weather banner above map — avoids short card beside tall map */}
			<Suspense fallback={<CurrentWeatherSkeleton />}>
				<CurrentWeather coords={coords} />
			</Suspense>

			<div className="flex min-w-0 flex-col gap-4">
				<div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end">
					<MapControlsSelector
						label="Select Map Layer"
						selectedControl={selectedMapLayer}
						controlOptions={mapLayers}
						setControl={setSelectedMapLayer}
					/>
					<MapControlsSelector
						label="Select Map Style"
						selectedControl={selectedMapStyle}
						controlOptions={mapStyleOptions}
						setControl={setMapStyleOverride}
					/>
				</div>
				<MapErrorBoundary>
					<MapWrapper
						coords={coords}
						onMapClick={handleSetCoordinates}
						mapLayer={selectedMapLayer}
						mapStyle={selectedMapStyle}
					/>
				</MapErrorBoundary>
			</div>
		</section>
	);
}
