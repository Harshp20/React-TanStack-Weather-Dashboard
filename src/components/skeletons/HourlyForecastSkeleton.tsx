import { Skeleton } from "@/components/ui/skeleton";
import CardSkeleton from "./CardSkeleton";

export default function HourlyForecastSkeleton() {
	return (
		<CardSkeleton titleWidth="w-52">
			<div className="flex gap-8 overflow-hidden justify-between">
				{Array.from({ length: 8 }, (_, i) => `hour-${i}`).map((id) => (
					<div key={id} className="flex shrink-0 flex-col items-center gap-2">
						<Skeleton className="h-4 w-12" />
						<Skeleton className="size-10 rounded-full" />
						<Skeleton className="h-4 w-8" />
					</div>
				))}
			</div>
		</CardSkeleton>
	);
}
