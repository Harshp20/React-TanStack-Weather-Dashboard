type CardProps = Readonly<{
	children: React.ReactNode;
	title: string;
}>;

export default function Card({ children, title }: CardProps) {
	return (
		<section className="flex flex-col rounded-xl border border-gray-700 bg-mist-800 p-3 gap-3 shadow-md">
			<h3 className="text-lg">{title}</h3>
			{children}
		</section>
	);
}
