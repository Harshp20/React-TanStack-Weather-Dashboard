import { useWeatherData } from "../hooks/useWeatherData";
import { formatTime } from "../utils/formatTime";
import Card from "./Card";
import WeatherIcon from "./WeatherIcon";

export default function CurrentWeather() {
	const { data } = useWeatherData();

	return (
		<Card title="Current Weather">
			<div className="flex flex-col gap-4">
				<div className="flex flex-col items-center justify-between gap-2">
					<h2 className="text-6xl">{Math.round(data.current.temp)}°</h2>
					<p className="flex-center">
						<WeatherIcon
							icon={data.current.weather[0].icon}
							iconClassNames="size-14"
						/>
					</p>
					<p className="text-lg capitalize">
						{data.current.weather[0].description}
					</p>
					<div className="flex items-baseline justify-between gap-2">
						<h3 className="text-3xl font-thin text-nowrap">
							{formatTime(data.current.dt)}
						</h3>
						<p className="text-white/75">(local time)</p>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex flex-col items-center justify-between gap-2">
						<p className="text-white/75">Feels like</p>
						<p className="text-md"> {Math.round(data.current.feels_like)}°</p>
					</div>
					<div className="flex flex-col items-center justify-between gap-2">
						<p className="text-white/75">Wind </p>
						<p className="text-md"> {data.current.wind_speed} kph</p>
					</div>
					<div className="flex flex-col items-center justify-between gap-2">
						<p className="text-white/75">Humidity</p>
						<p className="text-md">{data.current.humidity}%</p>
					</div>
				</div>
			</div>
		</Card>
	);
}
