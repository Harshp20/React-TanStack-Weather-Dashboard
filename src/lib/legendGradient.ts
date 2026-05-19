import type { LegendStop } from "@/constants/mapLayerLegends";

/**
 * Build a CSS `linear-gradient` from legend stops for a horizontal color bar.
 * Positions are normalized between min and max stop values.
 */
export function stopsToLinearGradient(
	stops: readonly LegendStop[],
	direction: "to right" | "to top" = "to right",
): string {
	if (stops.length === 0) return "transparent";

	const values = stops.map((s) => s.value);
	const min = Math.min(...values);
	const max = Math.max(...values);
	const range = max - min || 1;

	const segments = stops.map((stop) => {
		const pct = ((stop.value - min) / range) * 100;
		return `${stop.color} ${pct}%`;
	});

	return `linear-gradient(${direction}, ${segments.join(", ")})`;
}
