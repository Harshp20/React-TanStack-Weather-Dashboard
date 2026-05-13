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
			className={cn("size-8", iconClassNames)}
			src={`https://openweathermap.org/payload/api/media/file/${icon}.png`}
			alt="Daily Weather Condition"
		/>
	);
}
