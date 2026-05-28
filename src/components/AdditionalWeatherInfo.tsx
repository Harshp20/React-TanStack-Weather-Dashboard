import {
	Cloudy,
	Droplets,
	Eye,
	Gauge,
	Radiation,
	Sunrise,
	Sunset,
	Thermometer,
	Wind,
} from "lucide-react";
import { useWeatherData } from "../hooks/useWeatherData";
import type { WeatherComponentProps, WeatherDataCurrentKey } from "../types";
import Card from "./Card";
import { WeatherInfoRow } from "./WeatherInfoRow";

export default function AdditionalWeatherInfo({
	coords,
	className,
}: WeatherComponentProps) {
	const { data } = useWeatherData(coords);

	return (
		<Card title="Additional Weather Info" className={className}>
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
		title: "Wind Speed",
		key: "wind_speed",
		icon: Wind,
	},
	{
		title: "Wind Gust",
		key: "wind_gust",
		icon: Wind,
	},
	{
		title: "Pressure",
		key: "pressure",
		icon: Gauge,
	},
	{
		title: "Humidity",
		key: "humidity",
		icon: Droplets,
	},
	{
		title: "Feels Like",
		key: "feels_like",
		icon: Thermometer,
	},
	{
		title: "Dew Point",
		key: "dew_point",
		icon: Thermometer,
	},
	{
		title: "Visibility",
		key: "visibility",
		icon: Eye,
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
