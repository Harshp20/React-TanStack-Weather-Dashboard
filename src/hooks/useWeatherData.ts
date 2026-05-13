import { useSuspenseQuery } from "@tanstack/react-query";
import { data, getWeatherData } from "../api";

export function useWeatherData() {
	// return useSuspenseQuery({
	// 	queryKey: ["weather-data"],
	// 	queryFn: () => getWeatherData({ lat: 33.44, lon: 94.04 }),

	// 	// TODO: remove this
	// 	staleTime: Infinity,
	// });
	return { data };
}
