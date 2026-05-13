import { ArrowUp } from "lucide-react";
import { data } from "../api";
import { formatTime } from "./formatTime";

export function formatWeatherData(key: string) {
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
