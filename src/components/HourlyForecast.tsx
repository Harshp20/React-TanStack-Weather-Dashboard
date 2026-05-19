import { useWeatherData } from "../hooks/useWeatherData";
import type { WeatherComponentProps } from "../types";
import { formatTime } from "../utils/formatTime";
import Card from "./Card";
import WeatherIcon from "./WeatherIcon";

export default function HourlyForecast({ coords }: WeatherComponentProps) {
	const { data } = useWeatherData(coords);

	return (
		<Card title="Hourly Forecast (48 Hours)">
			<ul className="flex justify-between gap-8 overflow-x-auto">
				{data.hourly.map((hour) => (
					<li key={hour.dt} className="flex flex-col gap-2 text-center">
						<p className="text-nowrap">{formatTime(hour.dt)}</p>
						{hour.weather[0] ? (
							<p className="flex-center">
								<WeatherIcon icon={hour.weather[0].icon} />
							</p>
						) : null}
						<div>{hour.temp}°</div>
					</li>
				))}
			</ul>
		</Card>
	);
}
