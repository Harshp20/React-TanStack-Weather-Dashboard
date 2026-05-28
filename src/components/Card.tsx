import type { WithClassName } from "../types";
import { cn } from "../utils/cn";
import FadeIn from "./FadeIn";

type CardProps = Readonly<{
	children: React.ReactNode;
	title?: string;
}> &
	WithClassName;

export default function Card({ children, title, className }: CardProps) {
	return (
		<section
			className={cn(
				"flex flex-col gap-3 rounded-dashboard border border-dashboard-border/80 bg-dashboard-card-gradient p-card shadow-dashboard-md sm:gap-3 sm:p-card-md",
				className,
			)}
		>
			{title ? (
				<h3 className="text-dashboard-title font-medium text-dashboard-fg">
					{title}
				</h3>
			) : null}
			<FadeIn>{children}</FadeIn>
		</section>
	);
}
