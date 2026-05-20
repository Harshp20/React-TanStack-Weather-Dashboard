import { Skeleton } from "@/components/ui/skeleton";
import CurrentWeatherSkeleton from "./CurrentWeatherSkeleton";

export default function MainMapSkeleton() {
	return (
		<section className="flex min-w-0 flex-col gap-4 lg:gap-6">
			<CurrentWeatherSkeleton />
			<div className="flex min-w-0 flex-col gap-4">
				<div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end">
					<Skeleton className="h-8 w-44" />
					<Skeleton className="h-8 w-44" />
				</div>
				<Skeleton className="min-h-[280px] w-full rounded-dashboard sm:min-h-[400px] lg:min-h-[500px]" />
			</div>
		</section>
	);
}
