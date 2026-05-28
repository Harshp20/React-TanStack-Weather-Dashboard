import { cn } from "../utils/cn";

type WeatherIconProps = Readonly<{
	icon: string;
	iconClassNames?: string;
}>;

export default function WeatherIcon({
	icon,
	iconClassNames,
}: WeatherIconProps) {
	return (
		<img
			className={cn("size-8 object-contain", iconClassNames)}
			src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
			alt=""
		/>
	);
}
