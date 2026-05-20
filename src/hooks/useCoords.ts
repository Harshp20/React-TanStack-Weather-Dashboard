import { useCallback, useEffect, useState } from "react";
import { notify } from "@/lib/toast";
import type { Coords } from "@/types";
import { getInitialCoords } from "@/utils/geolocation";

type CoordsState =
	| { status: "loading" }
	| { status: "ready"; coords: Coords };

export function useCoords() {
	const [state, setState] = useState<CoordsState>({ status: "loading" });

	useEffect(() => {
		getInitialCoords().then(({ coords, toast }) => {
			if (toast) notify(toast.message, toast.variant);
			setState({ status: "ready", coords });
		});
	}, []);

	const setCoords = useCallback((coords: Coords) => {
		setState({ status: "ready", coords });
	}, []);

	return {
		coords: state.status === "ready" ? state.coords : null,
		isLoading: state.status === "loading",
		setCoords,
	};
}
