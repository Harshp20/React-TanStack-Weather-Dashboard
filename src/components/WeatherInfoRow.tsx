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
		<div className="flex justify-between gap-4 border-b border-dashboard-border-subtle py-2 text-dashboard-body first:pt-0 last:border-0 last:pb-0">
			<div className="flex min-w-0 items-center gap-2">
				<p className="text-subtle">{title}</p>
				<Icon size={20} className="shrink-0 text-dashboard-accent" />
			</div>
			<p className="shrink-0 font-medium">{formatWeatherData(data, key)}</p>
		</div>
	);
}
