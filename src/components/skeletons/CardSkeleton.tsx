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
				"flex flex-col gap-3 rounded-xl border border-mist-800 bg-linear-to-br from-mist-900 via-mist-900/80 to-mist-900/60 p-3 shadow-md",
				className,
			)}
		>
			<Skeleton className={cn("h-5", titleWidth)} />
			{children}
		</section>
	);
}
