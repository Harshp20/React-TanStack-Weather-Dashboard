import type { LeafletMouseEvent } from "leaflet";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import type { OnMapClickProps, WeatherComponentProps } from "../types";

export default function MapWrapper({
	coords,
	onMapClick,
}: WeatherComponentProps & OnMapClickProps) {
	return (
		<div className="flex-center">
			<MapContainer className="h-[600px] w-[80%]" center={coords} zoom={5}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={coords} />
				<MapClick coords={coords} onMapClick={onMapClick} />
			</MapContainer>
		</div>
	);
}

function MapClick({ coords, onMapClick }: OnMapClickProps) {
	const map = useMap();

	useEffect(() => {
		if (!map) return;
		map.panTo([coords.lat, coords.lng]);
	}, [coords.lat, coords.lng, map]);

	useEffect(() => {
		const handleClick = (e: LeafletMouseEvent) => {
			const { lat, lng } = e.latlng;
			map.panTo([lat, lng]);
			onMapClick({ lat, lng });
		};

		map.on("click", handleClick);
		return () => {
			map.off("click", handleClick);
		};
	}, [map, onMapClick]);

	return null;
}
