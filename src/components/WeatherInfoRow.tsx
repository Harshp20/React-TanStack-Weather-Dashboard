import type { LucideProps } from "lucide-react";
import type { WeatherData } from "../schemas/weather-data-schema";
import type { WeatherDataCurrentKey } from "../types";
import { formatWeatherData } from "../utils/formatWeatherData";

type WeatherInfoRowProps = Readonly<{
	data: WeatherData;
	title: string;
	infoKey: WeatherDataCurrentKey;
	icon: React.ForwardRefExoticComponent<
		Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
	>;
}>;

export function WeatherInfoRow({
	data,
	title,
	infoKey: key,
	icon: Icon,
}: WeatherInfoRowProps) {
	return (
		<div className="flex justify-between border-b border-gray-600/50 pb-1 first:pt-0 last:border-0 last:pb-0">
			<div className="flex items-center gap-2">
				<p className="text-white/75"> {title}</p>
				<Icon size={20} color="var(--color-standout)" />
			</div>
			<p>{formatWeatherData(data, key)}</p>
		</div>
	);
}
