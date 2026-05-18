import { useReverseGeocode } from "../hooks/useReverseGeocode";
import { useWeatherData } from "../hooks/useWeatherData";
import type { WeatherComponentProps } from "../types";
import { formatTime } from "../utils/formatTime";
import Card from "./Card";
import WeatherIcon from "./WeatherIcon";

export default function CurrentWeather({
	coords,
	className,
}: WeatherComponentProps) {
	const { data: weatherData } = useWeatherData(coords);
	const { data: reverseGeocodeData } = useReverseGeocode(coords);

	return (
		<Card title="Current Weather" className={className}>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col items-center justify-between gap-2">
					<h2 className="text-6xl">{Math.round(weatherData.current.temp)}°</h2>
					<p className="flex-center">
						<WeatherIcon
							icon={weatherData.current.weather[0].icon}
							iconClassNames="size-14"
						/>
					</p>
					<p className="text-lg text-important capitalize">
						{weatherData.current.weather[0].description}
					</p>
					{/* NOTE: Declaration in component would be more readable but this is how it's done using render props syntax. */}
					{(() => {
						const locationFromCoordinates = reverseGeocodeData[0];
						return (
							<p className="text-xl capitalize">
								{locationFromCoordinates?.local_names &&
									` ${locationFromCoordinates?.local_names?.en ?? locationFromCoordinates.name}`}
							</p>
						);
					})()}
					<div className="flex items-baseline justify-between gap-2">
						<h3 className="text-3xl font-thin text-nowrap">
							{formatTime(weatherData.current.dt)}
						</h3>
						<p className="text-muted">(local time)</p>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex flex-col items-center justify-between gap-2">
						<p className="text-muted">Feels like</p>
						<p className="text-md">
							{" "}
							{Math.round(weatherData.current.feels_like)}°
						</p>
					</div>
					<div className="flex flex-col items-center justify-between gap-2">
						<p className="text-muted">Wind </p>
						<p className="text-md"> {weatherData.current.wind_speed} kph</p>
					</div>
					<div className="flex flex-col items-center justify-between gap-2">
						<p className="text-muted">Humidity</p>
						<p className="text-md">{weatherData.current.humidity}%</p>
					</div>
				</div>
			</div>
		</Card>
	);
}
