import type { WeatherComponentProps } from "@/types";
import { useWeatherData } from "../hooks/useWeatherData";
import { formatDate } from "../utils/formatDate";
import Card from "./Card";
import WeatherIcon from "./WeatherIcon";

export default function DailyForecast({ coords }: WeatherComponentProps) {
	const { data } = useWeatherData(coords);

	return (
		<Card title="Daily Forecast">
			<div className="flex flex-col gap-1 sm:gap-3">
				<div className="hidden border-b border-dashboard-border-subtle pb-2 text-dashboard-caption font-medium text-subtle sm:grid sm:grid-cols-5 sm:text-center">
					<span className="text-left">Date</span>
					<span>Condition</span>
					<span>Day</span>
					<span>Min</span>
					<span>Max</span>
				</div>
				{data.daily.map((day) => (
					<div
						key={day.dt}
						className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-2 border-b border-dashboard-border-subtle py-3 text-dashboard-body last:border-0 sm:grid-cols-5 sm:gap-0 sm:py-2 sm:text-center"
					>
						<p className="col-span-2 text-left font-medium sm:col-span-1">
							{formatDate(day.dt)}
						</p>

						<div className="flex justify-end sm:col-span-1 sm:justify-center">
							{day.weather[0] ? (
								<WeatherIcon icon={day.weather[0].icon} />
							) : null}
						</div>

						<p className="text-dashboard-body font-medium sm:col-span-1">
							<span className="text-subtle mr-1 text-dashboard-caption sm:hidden">
								Day
							</span>
							{day.temp.day}°
						</p>

						<p className="text-subtle sm:col-span-1">
							<span className="mr-1 text-dashboard-caption sm:hidden">Min</span>
							{day.temp.min}°
						</p>

						<p className="text-subtle sm:col-span-1">
							<span className="mr-1 text-dashboard-caption sm:hidden">Max</span>
							{day.temp.max}°
						</p>
					</div>
				))}
			</div>
		</Card>
	);
}
