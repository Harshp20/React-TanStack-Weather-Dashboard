import CardSkeleton from "./CardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function CurrentWeatherSkeleton() {
	return (
		<CardSkeleton titleWidth="w-36">
			<div className="flex flex-col items-center gap-4">
				<Skeleton className="h-16 w-28" />
				<Skeleton className="size-14 rounded-full" />
				<Skeleton className="h-5 w-44" />
				<Skeleton className="h-7 w-32" />
				<Skeleton className="h-8 w-56" />
				<div className="grid w-full grid-cols-3 gap-2 border-t border-dashboard-border-subtle pt-4 sm:flex sm:justify-between">
					<Skeleton className="mx-auto h-12 w-20" />
					<Skeleton className="mx-auto h-12 w-20" />
					<Skeleton className="mx-auto h-12 w-20" />
				</div>
			</div>
		</CardSkeleton>
	);
}
