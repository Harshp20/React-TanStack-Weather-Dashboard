import type { WithClassName } from "../types";
import { cn } from "../utils/cn";

type FadeInProps = Readonly<{
	children: React.ReactNode;
}> &
	WithClassName;

/** Subtle enter animation when card content mounts after loading. */
export default function FadeIn({ children, className }: FadeInProps) {
	return (
		<div
			className={cn(
				"motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-500",
				"motion-safe:ease-out motion-safe:fill-mode-both",
				className,
			)}
		>
			{children}
		</div>
	);
}
