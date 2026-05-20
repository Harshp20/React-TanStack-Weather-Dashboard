import CardSkeleton from "./CardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function CurrentWeatherSkeleton() {
	return (
		<CardSkeleton titleWidth="w-36">
			<div className="flex flex-col items-center gap-4">
				<Skeleton className="h-16 w-28" />
				<Skeleton className="h-14 w-14 rounded-full" />
				<Skeleton className="h-5 w-44" />
				<Skeleton className="h-7 w-56" />
				<Skeleton className="h-8 w-32" />
				<div className="flex w-full justify-between pt-2">
					<Skeleton className="h-12 w-20" />
					<Skeleton className="h-12 w-20" />
					<Skeleton className="h-12 w-20" />
				</div>
			</div>
		</CardSkeleton>
	);
}
