import {
	Cloudy,
	Radiation,
	Sunrise,
	Sunset,
	Wind,
	WindArrowDown,
} from "lucide-react";
import { useWeatherData } from "../hooks/useWeatherData";
import type { WeatherComponentProps, WeatherDataCurrentKey } from "../types";
import Card from "./Card";
import { WeatherInfoRow } from "./WeatherInfoRow";

export default function AdditionalWeatherInfo({
	coords,
}: WeatherComponentProps) {
	const { data } = useWeatherData(coords);

	return (
		<Card title="Additional Weather Info">
			<div className="flex flex-col gap-4">
				{additionalWeatherInfoMap.map((info) => (
					<WeatherInfoRow
						data={data}
						key={info.key}
						icon={info.icon}
						infoKey={info.key as WeatherDataCurrentKey}
						title={info.title}
					/>
				))}
			</div>
		</Card>
	);
}

const additionalWeatherInfoMap = [
	{ title: "Cloudiness", key: "clouds", icon: Cloudy },
	{
		title: "UV Index",
		key: "uvi",
		icon: Radiation,
	},
	{
		title: "Wind Direction",
		key: "wind_deg",
		icon: Wind,
	},
	{
		title: "Pressure",
		key: "pressure",
		icon: WindArrowDown,
	},
	{
		title: "Sunrise",
		key: "sunrise",
		icon: Sunrise,
	},
	{
		title: "Sunset",
		key: "sunset",
		icon: Sunset,
	},
];
