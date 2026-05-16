import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { OnMapClick, WeatherComponentProps } from "../types";

export default function MapWrapper({
	coords,
	onMapClick,
}: WeatherComponentProps & OnMapClick) {
	return (
		<div>
			<MapContainer className="h-[600px] max-w-full" center={coords} zoom={5}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={coords} />
				<MapClick onMapClick={onMapClick} />
			</MapContainer>
		</div>
	);
}

function MapClick({ onMapClick }: OnMapClick) {
	const map = useMap();

	map.on("click", (e) => {
		const { lat, lng } = e.latlng;
		map.panTo([lat, lng]);
		onMapClick({ lat, lng });
	});

	return null;
}
