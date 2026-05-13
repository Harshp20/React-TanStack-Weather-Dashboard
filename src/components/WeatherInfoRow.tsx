import type { LucideProps } from "lucide-react";
import { formatWeatherData } from "../utils/formatWeatherData";

type WeatherInfoRowProps = Readonly<{
	title: string;
	infoKey: string;
	icon: React.ForwardRefExoticComponent<
		Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
	>;
}>;

export function WeatherInfoRow({
	title,
	infoKey: key,
	icon: Icon,
}: WeatherInfoRowProps) {
	return (
		<div
			key={key}
			className="flex justify-between border-b border-gray-600/50 pb-1 first:pt-0 last:border-0 last:pb-0"
		>
			<div className="flex items-center gap-2">
				<p className="text-white/75"> {title}</p>
				<Icon size={20} color="#ff771c" />
			</div>
			<p>{formatWeatherData(key)}</p>
		</div>
	);
}
