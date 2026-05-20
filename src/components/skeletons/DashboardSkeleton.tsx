import AdditionalWeatherInfoSkeleton from "./AdditionalWeatherInfoSkeleton";
import DailyForecastSkeleton from "./DailyForecastSkeleton";
import HourlyForecastSkeleton from "./HourlyForecastSkeleton";
import MainMapSkeleton from "./MainMapSkeleton";

/** Full-page placeholder while initial coordinates are resolving. */
export default function DashboardSkeleton() {
	return (
		<>
			<MainMapSkeleton />
			<HourlyForecastSkeleton />
			<DailyForecastSkeleton />
			<AdditionalWeatherInfoSkeleton />
		</>
	);
}
