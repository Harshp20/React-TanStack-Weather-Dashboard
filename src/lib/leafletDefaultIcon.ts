import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

const defaultIconOptions: L.IconOptions = {
	iconUrl,
	iconRetinaUrl,
	shadowUrl,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
};

// Leaflet’s default icon URLs point at the site root; Vite must bundle these assets.
// @see https://github.com/Leaflet/Leaflet/issues/4968
delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions(defaultIconOptions);

export const defaultMarkerIcon = new L.Icon.Default(defaultIconOptions);
