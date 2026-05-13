import { MapContainer, Marker, TileLayer, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLng, type Map as LeafletMap } from "leaflet";
import { useCallback, useEffect, useMemo, useState } from "react";

const center: [number, number] = [51.505, -0.09];
const zoom = 5;

export default function MapWrapper() {
	const [map, setMap] = useState<LeafletMap | null>(null);
	const [position, setPosition] = useState(() => map?.getCenter());

	const onClick = useCallback(() => {
		map?.setView(center, zoom);
	}, [map]);

	const onMove = useCallback(() => {
		setPosition(map?.getCenter());
	}, [map]);

	useEffect(() => {
		map?.on("move", onMove);
		return () => {
			map?.off("move", onMove);
		};
	}, [map, onMove]);

	const displayMap = useMemo(
		() => (
			<MapContainer
				className="max-w-full h-[600px]"
				center={new LatLng(center[0], center[1])}
				zoom={zoom}
				ref={setMap}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={center} />
				<SetViewOnClick />
			</MapContainer>
		),
		[],
	);

	return (
		<div>
			{map ? (
				<p>
					latitude: {position?.lat.toFixed(4)}, longitude:{" "}
					{position?.lng.toFixed(4)}{" "}
					<button type="button" onClick={onClick}>
						reset
					</button>
				</p>
			) : null}
			{displayMap}
		</div>
	);
}

function SetViewOnClick() {
	useMapEvent("click", (e) => {
		e.target.setView(e.latlng, e.target.getZoom(), {
			animate: true,
		});
	});

	return null;
}
