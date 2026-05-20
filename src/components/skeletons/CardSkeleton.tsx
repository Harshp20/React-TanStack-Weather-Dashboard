import type { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type CardSkeletonProps = Readonly<{
	titleWidth?: string;
	children: ReactNode;
	className?: string;
}>;

export default function CardSkeleton({
	titleWidth = "w-40",
	children,
	className,
}: CardSkeletonProps) {
	return (
		<section
			className={cn(
				"flex flex-col gap-3 rounded-dashboard border border-dashboard-border bg-dashboard-card-gradient p-card shadow-dashboard-md sm:p-card-md",
				className,
			)}
		>
			<Skeleton className={cn("h-5", titleWidth)} />
			{children}
		</section>
	);
}
