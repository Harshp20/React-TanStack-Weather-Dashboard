import type { MapLayerKey } from "@/types";

/** Single color stop on the legend scale (value → color). */
export type LegendStop = Readonly<{
	value: number;
	color: string;
}>;

/** Legend metadata for one overlay scale (title, unit, color stops). */
export type MapLayerLegend = Readonly<{
	title: string;
	unit: string;
	stops: readonly LegendStop[];
}>;

export const mapLayerLegends: Record<MapLayerKey, readonly MapLayerLegend[]> = {
	precipitation_new: [
		{
			title: "Classic rain",
			unit: "mm",
			stops: [
				{ value: 0, color: "rgba(225, 200, 100, 0)" },
				{ value: 0.1, color: "rgba(200, 150, 150, 0)" },
				{ value: 0.2, color: "rgba(150, 150, 170, 0)" },
				{ value: 0.5, color: "rgba(120, 120, 190, 0)" },
				{ value: 1, color: "rgba(110, 110, 205, 0.3)" },
				{ value: 10, color: "rgba(80, 80, 225, 0.7)" },
				{ value: 140, color: "rgba(20, 20, 255, 0.9)" },
			],
		},
		{
			title: "Snow",
			unit: "mm",
			stops: [
				{ value: 0, color: "transparent" },
				{ value: 5, color: "#00d8ff" },
				{ value: 10, color: "#00b6ff" },
				{ value: 25.076, color: "#9549ff" },
			],
		},
	],
	clouds_new: [
		{
			title: "Classic clouds",
			unit: "%",
			stops: [
				{ value: 0, color: "rgba(255, 255, 255, 0)" },
				{ value: 10, color: "rgba(253, 253, 255, 0.1)" },
				{ value: 20, color: "rgba(252, 251, 255, 0.2)" },
				{ value: 30, color: "rgba(250, 250, 255, 0.3)" },
				{ value: 40, color: "rgba(249, 248, 255, 0.4)" },
				{ value: 50, color: "rgba(247, 247, 255, 0.5)" },
				{ value: 60, color: "rgba(246, 245, 255, 0.75)" },
				{ value: 70, color: "rgba(244, 244, 255, 1)" },
				{ value: 80, color: "rgba(243, 242, 255, 1)" },
				{ value: 90, color: "rgba(242, 241, 255, 1)" },
				{ value: 100, color: "rgba(240, 240, 255, 1)" },
			],
		},
	],
	temp_new: [
		{
			title: "Temperature",
			unit: "°C",
			stops: [
				{ value: -65, color: "rgba(130, 22, 146, 1)" },
				{ value: -55, color: "rgba(130, 22, 146, 1)" },
				{ value: -45, color: "rgba(130, 22, 146, 1)" },
				{ value: -40, color: "rgba(130, 22, 146, 1)" },
				{ value: -30, color: "rgba(130, 87, 219, 1)" },
				{ value: -20, color: "rgba(32, 140, 236, 1)" },
				{ value: -10, color: "rgba(32, 196, 232, 1)" },
				{ value: 0, color: "rgba(35, 221, 221, 1)" },
				{ value: 10, color: "rgba(194, 255, 40, 1)" },
				{ value: 20, color: "rgba(255, 240, 40, 1)" },
				{ value: 25, color: "rgba(255, 194, 40, 1)" },
				{ value: 30, color: "rgba(252, 128, 20, 1)" },
			],
		},
	],
	pressure_new: [
		{
			title: "Pressure",
			unit: "Pa",
			stops: [
				{ value: 94_000, color: "rgba(0, 115, 255, 1)" },
				{ value: 96_000, color: "rgba(0, 170, 255, 1)" },
				{ value: 98_000, color: "rgba(75, 208, 214, 1)" },
				{ value: 100_000, color: "rgba(141, 231, 199, 1)" },
				{ value: 101_000, color: "rgba(176, 247, 32, 1)" },
				{ value: 102_000, color: "rgba(240, 184, 0, 1)" },
				{ value: 104_000, color: "rgba(251, 85, 21, 1)" },
				{ value: 106_000, color: "rgba(243, 54, 59, 1)" },
				{ value: 108_000, color: "rgba(198, 0, 0, 1)" },
			],
		},
	],
	wind_new: [
		{
			title: "Wind",
			unit: "m/s",
			stops: [
				{ value: 1, color: "rgba(255, 255, 255, 0)" },
				{ value: 5, color: "rgba(238, 206, 206, 0.4)" },
				{ value: 15, color: "rgba(179, 100, 188, 0.7)" },
				{ value: 25, color: "rgba(63, 33, 59, 0.8)" },
				{ value: 50, color: "rgba(116, 76, 172, 0.9)" },
				{ value: 100, color: "rgba(70, 0, 175, 1)" },
				{ value: 200, color: "rgba(13, 17, 38, 1)" },
			],
		},
	],
};

export function getLegendsForLayer(
	layer: MapLayerKey,
): readonly MapLayerLegend[] {
	return mapLayerLegends[layer];
}
