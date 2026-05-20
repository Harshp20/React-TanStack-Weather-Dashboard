import {
	getLegendsForLayer,
	type MapLayerLegend,
} from "@/constants/mapLayerLegends";
import { stopsToLinearGradient } from "@/lib/legendGradient";
import type { MapLayerKey } from "@/types";
import { cn } from "@/utils/cn";

type MapLegendProps = Readonly<{
	mapLayer: MapLayerKey;
	className?: string;
}>;

const legendEnterAnimation = cn(
	"motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2",
	"motion-safe:duration-300 motion-safe:ease-out motion-safe:fill-mode-both",
);

export default function MapLegend({ mapLayer, className }: MapLegendProps) {
	const legends = getLegendsForLayer(mapLayer);

	return (
		<aside
			className={cn(
				"pointer-events-none absolute bottom-2 left-2 z-1000 max-w-[min(calc(100%-1rem),200px)] sm:bottom-4 sm:left-4 sm:max-w-[min(calc(100%-2rem),280px)]",
				className,
			)}
			aria-label="Map layer legend"
		>
			<div
				key={mapLayer}
				className={cn("flex flex-col gap-1 sm:gap-2", legendEnterAnimation)}
			>
				{legends.map((legend) => (
					<LegendScale key={legend.title} legend={legend} />
				))}
			</div>
		</aside>
	);
}

function LegendScale({ legend }: Readonly<{ legend: MapLayerLegend }>) {
	const { title, unit, stops } = legend;
	const min = stops[0]?.value ?? 0;
	const max = stops[stops.length - 1]?.value ?? 0;
	const gradient = stopsToLinearGradient(stops);

	return (
		<div className="rounded-dashboard border border-dashboard-border bg-dashboard-card/90 px-2 py-1.5 shadow-dashboard-md backdrop-blur-sm sm:px-3 sm:py-2">
			<p className="text-subtle mb-1 text-[10px] leading-tight font-medium sm:mb-1.5 sm:text-dashboard-caption">
				{title}{" "}
				<span className="opacity-60">({unit})</span>
			</p>
			<div
				className="h-1.5 w-full rounded-sm border border-white/10 sm:h-2.5"
				style={{ background: gradient }}
				aria-hidden
			/>
			<div className="text-subtle mt-0.5 flex justify-between text-[8px] tabular-nums sm:mt-1 sm:text-[10px]">
				<span>{formatLegendValue(min, unit)}</span>
				<span>{formatLegendValue(max, unit)}</span>
			</div>
		</div>
	);
}

function formatLegendValue(value: number, unit: string): string {
	if (unit === "Pa") {
		return `${Math.round(value / 1000)}k`;
	}
	if (Number.isInteger(value)) {
		return String(value);
	}
	return String(Number(value.toFixed(value < 1 ? 1 : 0)));
}
