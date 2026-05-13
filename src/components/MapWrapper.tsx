import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { OnMapClick, WeatherComponentProps } from "../types";

const center: [number, number] = [51.505, -0.09];
const zoom = 5;

export default function MapWrapper({
	coords,
	onMapClick,
}: WeatherComponentProps & OnMapClick) {
	return (
		<div>
			{/* <p>
				latitude: {position?.lat.toFixed(4)}, longitude:{" "}
				{position?.lng.toFixed(4)}{" "}
			</p> */}
			<MapContainer
				className="max-w-full h-[600px]"
				center={coords}
				zoom={zoom}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={center} />
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
