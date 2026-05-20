import { Skeleton } from "@/components/ui/skeleton";
import CurrentWeatherSkeleton from "./CurrentWeatherSkeleton";

export default function MainMapSkeleton() {
	return (
		<div className="grid grid-cols-[1fr_2fr] gap-6">
			<CurrentWeatherSkeleton />
			<div className="flex flex-col gap-4">
				<div className="flex justify-end gap-4">
					<Skeleton className="h-8 w-44" />
					<Skeleton className="h-8 w-44" />
				</div>
				<Skeleton className="min-h-[500px] w-full rounded-xl" />
			</div>
		</div>
	);
}
