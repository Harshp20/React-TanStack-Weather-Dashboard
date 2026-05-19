import { ArrowUp } from "lucide-react";
import type { WeatherData } from "../schemas/weather-data-schema";
import type { WeatherDataCurrentKey } from "../types";
import { formatTime } from "./formatTime";

const UNAVAILABLE = "—";

export function formatWeatherData(
	data: WeatherData,
	key: WeatherDataCurrentKey,
) {
	const value = data.current[key];

	if (value == null) {
		return UNAVAILABLE;
	}

	if (key === "sunrise" || key === "sunset") {
		return formatTime(value);
	}

	if (key === "wind_deg") {
		return <ArrowUp style={{ rotate: `${value}deg` }} />;
	}

	if (key === "clouds") {
		return `${value}%`;
	}

	return value;
}
