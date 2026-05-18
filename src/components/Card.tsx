import type { WithClassName } from "../types";
import { cn } from "../utils/cn";

type CardProps = Readonly<{
	children: React.ReactNode;
	title: string;
}> &
	WithClassName;

export default function Card({ children, title, className }: CardProps) {
	return (
		<section
			className={cn(
				"flex flex-col rounded-xl border border-gray-700 bg-mist-800 p-3 gap-3 shadow-md",
				className,
			)}
		>
			<h3 className="text-lg">{title}</h3>
			{children}
		</section>
	);
}
