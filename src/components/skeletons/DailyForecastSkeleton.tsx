import CardSkeleton from "./CardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function DailyForecastSkeleton() {
	return (
		<CardSkeleton titleWidth="w-32">
			<div className="flex flex-col gap-3">
				{Array.from({ length: 7 }, (_, i) => `day-${i}`).map((id) => (
					<div
						key={id}
						className="flex items-center gap-4 border-b border-gray-600/50 pb-3 last:border-0"
					>
						<Skeleton className="h-4 flex-1" />
						<Skeleton className="size-8 shrink-0 rounded-full" />
						<Skeleton className="h-4 w-10" />
						<Skeleton className="h-4 w-10" />
						<Skeleton className="h-4 w-10" />
					</div>
				))}
			</div>
		</CardSkeleton>
	);
}
