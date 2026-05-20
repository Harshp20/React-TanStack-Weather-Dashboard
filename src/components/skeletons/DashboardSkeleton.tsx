import { Skeleton } from "@/components/ui/skeleton";
import AdditionalWeatherInfoSkeleton from "./AdditionalWeatherInfoSkeleton";
import DailyForecastSkeleton from "./DailyForecastSkeleton";
import HourlyForecastSkeleton from "./HourlyForecastSkeleton";
import MainMapSkeleton from "./MainMapSkeleton";

/** Full-page placeholder while initial coordinates are resolving. */
export default function DashboardSkeleton() {
	return (
		<>
			<div className="flex-center">
				<Skeleton className="h-10 w-full max-w-md rounded-lg" />
			</div>
			<MainMapSkeleton />
			<HourlyForecastSkeleton />
			<DailyForecastSkeleton />
			<AdditionalWeatherInfoSkeleton />
		</>
	);
}
