import { Skeleton } from "@/components/ui/skeleton";

/** Placeholder for the location search bar (matches desktop width). */
export default function SearchPlacesSkeleton() {
	return (
		<div className="w-full sm:mx-auto sm:w-[30%]">
			<Skeleton className="h-10 w-full rounded-dashboard" />
		</div>
	);
}
