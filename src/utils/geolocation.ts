import { DEFAULT_COORDS } from "@/constants/defaultCoords";
import type { NotifyVariant } from "@/lib/toast";
import type { Coords } from "@/types";

export type InitialCoordsToast = {
	message: string;
	variant: NotifyVariant;
};

export type InitialCoordsResult = {
	coords: Coords;
	toast?: InitialCoordsToast;
};

function getCurrentPosition(): Promise<Coords> {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				resolve({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
			},
			(error) => reject(new Error(error.message)),
		);
	});
}

export async function getInitialCoords(): Promise<InitialCoordsResult> {
	if (!("geolocation" in navigator)) {
		return {
			coords: DEFAULT_COORDS,
			toast: {
				variant: "error",
				message:
					"Geolocation is not supported. Showing default location.",
			},
		};
	}

	try {
		const coords = await getCurrentPosition();
		return { coords };
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error";
		return {
			coords: DEFAULT_COORDS,
			toast: {
				variant: "error",
				message: `Could not detect your location (${message}). Showing default location.`,
			},
		};
	}
}
