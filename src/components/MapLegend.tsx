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
				"pointer-events-none absolute bottom-4 left-4 z-1000 max-w-[min(100%-2rem,280px)]",
				className,
			)}
			aria-label="Map layer legend"
		>
			<div key={mapLayer} className={cn("flex flex-col gap-2", legendEnterAnimation)}>
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
		<div className="rounded-dashboard border border-dashboard-border bg-dashboard-card/90 px-3 py-2 shadow-dashboard-md backdrop-blur-sm">
			<p className="text-subtle mb-1.5 text-dashboard-caption font-medium">
				{title}{" "}
				<span className="opacity-60">({unit})</span>
			</p>
			<div
				className="h-2.5 w-full rounded-sm border border-white/10"
				style={{ background: gradient }}
				aria-hidden
			/>
			<div className="text-subtle mt-1 flex justify-between text-[10px] tabular-nums">
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
