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

	if (key === "humidity") {
		return `${value}%`;
	}

	if (key === "pressure") {
		return `${value} hPa`;
	}

	if (
		key === "temp" ||
		key === "feels_like" ||
		key === "dew_point"
	) {
		return `${value}\u00b0`;
	}

	if (key === "wind_speed" || key === "wind_gust") {
		return `${value} m/s`;
	}

	if (key === "visibility") {
		return `${Math.round(value / 100) / 10} km`;
	}

	return value;
}
