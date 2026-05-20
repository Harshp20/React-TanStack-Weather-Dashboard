import type { LeafletMouseEvent } from "leaflet";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import { useEffect, useRef } from "react";
import type { MapStyleId } from "@/lib/maptilerStyles";
import { notify } from "@/lib/toast";
import type { Coords, MapLayerKey, WeatherComponentProps } from "../types";
import { cn } from "../utils/cn";
import MapLegend from "./MapLegend";

const DETAIL_ZOOM = 13;
const OVERVIEW_ZOOM = 8;
const INITIAL_ZOOM = 5;
const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;

export default function MapWrapper({
	mapLayer,
	mapStyle,
	coords,
	onMapClick,
	className,
}: WeatherComponentProps &
	MapClickProps & { mapLayer: MapLayerKey; mapStyle: MapStyleId }) {
	return (
		<div className={cn("relative h-full min-h-[500px] w-full", className)}>
			<MapContainer
				className="h-full min-h-[500px] w-full overflow-hidden rounded-xl border border-gray-700"
				center={coords}
				zoom={INITIAL_ZOOM}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url={`https://tile.openweathermap.org/map/${mapLayer}/{z}/{x}/{y}.png?appid=${OPENWEATHER_API_KEY}`}
				/>

				<Marker position={coords} />
				<FlyToCoords coords={coords} />
				<MapClick onMapClick={onMapClick} />
				<MapTileLayer mapStyle={mapStyle} />
			</MapContainer>
			<MapLegend mapLayer={mapLayer} />
		</div>
	);
}

export type MapClickProps = {
	coords: Coords;
	onMapClick: (coords: Coords) => void;
};

function isFarFromView(map: L.Map, target: L.LatLngExpression) {
	return !map.getBounds().contains(L.latLng(target));
}

function FlyToCoords({ coords }: Pick<MapClickProps, "coords">) {
	const map = useMap();
	const isFirstRender = useRef(true);

	useEffect(() => {
		const target: L.LatLngExpression = [coords.lat, coords.lng];
		let cancelled = false;

		const flyToDetail = () => {
			if (!cancelled) {
				try {
					map.flyTo(target, DETAIL_ZOOM, { duration: 1 });
				} catch {
					// Map may be torn down during unmount
				}
			}
		};

		const flyTo = (zoom: number, duration: number) => {
			if (cancelled) return;
			try {
				map.flyTo(target, zoom, { duration });
			} catch {
				// Map may be torn down during unmount
			}
		};

		if (isFirstRender.current) {
			isFirstRender.current = false;
			flyTo(OVERVIEW_ZOOM, 0.8);
			const timer = globalThis.setTimeout(flyToDetail, 850);
			return () => {
				cancelled = true;
				clearTimeout(timer);
				map.stop();
			};
		}

		if (isFarFromView(map, target)) {
			flyTo(OVERVIEW_ZOOM, 0.8);
			const timer = globalThis.setTimeout(flyToDetail, 850);
			return () => {
				cancelled = true;
				clearTimeout(timer);
				map.stop();
			};
		}

		flyTo(DETAIL_ZOOM, 0.8);
		return () => {
			cancelled = true;
			map.stop();
		};
	}, [coords.lat, coords.lng, map]);

	return null;
}

function MapClick({ onMapClick }: Pick<MapClickProps, "onMapClick">) {
	const map = useMap();

	useEffect(() => {
		const handleClick = (e: LeafletMouseEvent) => {
			const { lat, lng } = e.latlng;
			onMapClick({ lat, lng });
		};

		map.on("click", handleClick);
		return () => {
			map.off("click", handleClick);
		};
	}, [map, onMapClick]);

	return null;
}

function MapTileLayer({ mapStyle }: { mapStyle: MapStyleId }) {
	const map = useMap();
	const warnedMissingKey = useRef(false);

	useEffect(() => {
		if (!MAPTILER_API_KEY) {
			if (!warnedMissingKey.current) {
				warnedMissingKey.current = true;
				notify(
					"Map base layer unavailable (missing MapTiler API key).",
					"error",
				);
			}
			return;
		}

		let tileLayer: InstanceType<typeof MaptilerLayer> | null = null;

		try {
			tileLayer = new MaptilerLayer({
				style: mapStyle,
				apiKey: MAPTILER_API_KEY,
			});
			tileLayer.addTo(map);
		} catch (error) {
			console.error("Failed to add MapTiler layer:", error);
			notify("Map style could not be loaded.", "error");
			return;
		}

		return () => {
			if (!tileLayer) return;
			try {
				map.removeLayer(tileLayer);
			} catch {
				// Map already destroyed
			}
		};
	}, [map, mapStyle]);

	return null;
}
