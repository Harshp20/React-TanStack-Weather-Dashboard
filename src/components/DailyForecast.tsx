import type { WeatherComponentProps } from "@/types";
import { useWeatherData } from "../hooks/useWeatherData";
import { formatDate } from "../utils/formatDate";
import Card from "./Card";
import WeatherIcon from "./WeatherIcon";

export default function DailyForecast({ coords }: WeatherComponentProps) {
	const { data } = useWeatherData(coords);

	return (
		<Card title="Daily Forecast">
			<div className="flex flex-col gap-3">
				{data?.daily.map((day) => (
					<div
						key={day.dt}
						className="flex text-center items-center border-b border-gray-600/50 first:pt-0 last:border-0"
					>
						<p className="flex-1 text-left">{formatDate(day.dt)}</p>

						<div className="flex-1 flex-center">
							<WeatherIcon icon={day.weather[0].icon} />
						</div>

						<p className="flex-1 text-gray-300">{day.temp.day}°</p>

						<p className="flex-1 text-subtle">{day.temp.min}°</p>

						<p className="flex-1 text-subtle">{day.temp.max}°</p>
					</div>
				))}
			</div>
		</Card>
	);
}
