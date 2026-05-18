import type { LeafletMouseEvent } from "leaflet";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import type { Coords, WeatherComponentProps } from "../types";

const DETAIL_ZOOM = 13;
const OVERVIEW_ZOOM = 5;
const INITIAL_ZOOM = 2;

export default function MapWrapper({
	coords,
	onMapClick,
}: WeatherComponentProps & MapClickProps) {
	return (
		<MapContainer className="flex-1 h-[500px]" center={coords} zoom={INITIAL_ZOOM}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={coords} />
			<FlyToCoords coords={coords} />
			<MapClick onMapClick={onMapClick} />
		</MapContainer>
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
				map.flyTo(target, DETAIL_ZOOM, { duration: 1 });
			}
		};

		if (isFirstRender.current) {
			isFirstRender.current = false;
			map.flyTo(target, OVERVIEW_ZOOM, { duration: 0.8 });
			const timer = globalThis.setTimeout(flyToDetail, 850);
			return () => {
				cancelled = true;
				clearTimeout(timer);
				map.stop();
			};
		}

		if (isFarFromView(map, target)) {
			map.flyTo(target, OVERVIEW_ZOOM, { duration: 0.8 });
			const timer = globalThis.setTimeout(flyToDetail, 850);
			return () => {
				cancelled = true;
				clearTimeout(timer);
				map.stop();
			};
		}

		map.flyTo(target, DETAIL_ZOOM, { duration: 0.8 });
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
