import CardSkeleton from "./CardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdditionalWeatherInfoSkeleton() {
	return (
		<CardSkeleton titleWidth="w-48">
			<div className="flex flex-col gap-4">
				{Array.from({ length: 6 }, (_, i) => `info-${i}`).map((id) => (
					<div key={id} className="flex items-center justify-between gap-4">
						<div className="flex items-center gap-3">
							<Skeleton className="size-5 shrink-0 rounded" />
							<Skeleton className="h-4 w-28" />
						</div>
						<Skeleton className="h-4 w-16" />
					</div>
				))}
			</div>
		</CardSkeleton>
	);
}
