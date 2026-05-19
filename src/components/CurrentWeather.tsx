import { useReverseGeocode } from "../hooks/useReverseGeocode";
import { useWeatherData } from "../hooks/useWeatherData";
import type { WeatherComponentProps } from "../types";
import { formatTime } from "../utils/formatTime";
import Card from "./Card";
import WeatherIcon from "./WeatherIcon";

function formatLocationName(
	location: { name: string; local_names?: Record<string, string> } | undefined,
) {
	if (!location) return null;
	return location.local_names?.en ?? location.name;
}

export default function CurrentWeather({
	coords,
	className,
}: WeatherComponentProps) {
	const { data: weatherData } = useWeatherData(coords);
	const { data: reverseGeocodeData } = useReverseGeocode(coords);
	const currentWeather = weatherData.current.weather[0];
	const locationName = formatLocationName(reverseGeocodeData[0]);

	return (
		<Card className={className}>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col items-center justify-between gap-2">
					<h2 className="text-6xl">{Math.round(weatherData.current.temp)}°</h2>
					{currentWeather ? (
						<>
							<p className="flex-center">
								<WeatherIcon
									icon={currentWeather.icon}
									iconClassNames="size-14"
								/>
							</p>
							<p className="text-lg text-important capitalize">
								{currentWeather.description}
							</p>
						</>
					) : null}
					{locationName ? (
						<p className="text-xl capitalize">{locationName}</p>
					) : null}
					<div className="flex items-baseline justify-between gap-2">
						<h3 className="text-3xl font-thin text-nowrap">
							{formatTime(weatherData.current.dt)}
						</h3>
						<p className="text-subtle">(local time)</p>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex flex-col items-center justify-between gap-2">
						<p className="text-subtle">Feels like</p>
						<p className="text-md">
							{" "}
							{Math.round(weatherData.current.feels_like)}°
						</p>
					</div>
					<div className="flex flex-col items-center justify-between gap-2">
						<p className="text-subtle">Wind </p>
						<p className="text-md"> {weatherData.current.wind_speed} kph</p>
					</div>
					<div className="flex flex-col items-center justify-between gap-2">
						<p className="text-subtle">Humidity</p>
						<p className="text-md">{weatherData.current.humidity}%</p>
					</div>
				</div>
			</div>
		</Card>
	);
}
