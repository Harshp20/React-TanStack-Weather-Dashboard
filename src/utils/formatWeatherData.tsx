import { ArrowUp } from "lucide-react";
import type { WeatherData } from "../schemas/weather-data-schema";
import type { WeatherDataCurrentKey } from "../types";
import { formatTime } from "./formatTime";

export function formatWeatherData(
	data: WeatherData,
	key: WeatherDataCurrentKey,
) {
	if (key === "sunrise" || key === "sunset") {
		return formatTime(data.current[key]);
	}

	if (key === "wind_deg") {
		return <ArrowUp style={{ rotate: `${data.current[key]}deg` }} />;
	}

	if (key === "clouds") {
		return `${data.current[key]}%`;
	}

	return data.current[key];
}
