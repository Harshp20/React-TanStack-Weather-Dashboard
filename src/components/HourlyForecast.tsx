import { useWeatherData } from "../hooks/useWeatherData";
import type { WeatherComponentProps } from "../types";
import { formatTime } from "../utils/formatTime";
import Card from "./Card";
import WeatherIcon from "./WeatherIcon";

export default function HourlyForecast({ coords }: WeatherComponentProps) {
	const { data } = useWeatherData(coords);

	return (
		<Card title="Hourly Forecast (48 Hours)">
			<ul className="-mx-1 flex gap-4 overflow-x-auto px-1 pb-1 sm:gap-6 md:gap-8">
				{data.hourly.map((hour) => (
					<li
						key={hour.dt}
						className="flex min-w-[4.5rem] shrink-0 flex-col gap-2 text-center text-dashboard-body"
					>
						<p className="text-dashboard-caption text-nowrap sm:text-dashboard-body">
							{formatTime(hour.dt)}
						</p>
						{hour.weather[0] ? (
							<p className="flex-center">
								<WeatherIcon icon={hour.weather[0].icon} />
							</p>
						) : null}
						<div className="font-medium">{hour.temp}°</div>
					</li>
				))}
			</ul>
		</Card>
	);
}
