import {
	MapStyle,
	type MapStyleVariant,
	mapStylePresetList,
	ReferenceMapStyle,
} from "@maptiler/sdk";

/** Cloud style id (e.g. `"streets-v4"`) — use as Select value and MaptilerLayer `style` */
export type MapStyleId = string;

export const DEFAULT_MAP_STYLE_ID: MapStyleId = "streets-v4-dark";

export type MapStyleOption = {
	id: MapStyleId;
	label: string;
	referenceStyleId: string;
	variantType: string;
	deprecated?: boolean;
};

/** e.g. `STREETS_V4` → 4, legacy alias `STREETS` → 0 */
function referenceStyleVersion(referenceStyleId: string): number {
	const match = referenceStyleId.match(/_V(\d+)$/i);
	return match ? Number.parseInt(match[1], 10) : 0;
}

/** Same cloud style id can appear under legacy + versioned presets (e.g. STREETS vs STREETS_V4). */
function pickPreferredMapStyleOption(
	candidate: MapStyleOption,
	incumbent: MapStyleOption,
): MapStyleOption {
	if (candidate.deprecated && !incumbent.deprecated) return incumbent;
	if (!candidate.deprecated && incumbent.deprecated) return candidate;

	return referenceStyleVersion(candidate.referenceStyleId) >=
		referenceStyleVersion(incumbent.referenceStyleId)
		? candidate
		: incumbent;
}

function dedupeMapStyleOptionsById(
	options: MapStyleOption[],
): MapStyleOption[] {
	const byId = new Map<MapStyleId, MapStyleOption>();

	for (const option of options) {
		const existing = byId.get(option.id);
		byId.set(
			option.id,
			existing ? pickPreferredMapStyleOption(option, existing) : option,
		);
	}

	return [...byId.values()];
}

/**
 * Flat list of selectable styles from the SDK's built-in catalog (`mapStylePresetList`).
 * @see https://docs.maptiler.com/client-js/api/variables/index.mapStylePresetList/
 */
export function getMapStyleOptions(
	options: { includeDeprecated?: boolean } = {},
): MapStyleOption[] {
	const { includeDeprecated = false } = options;

	const optionsList = mapStylePresetList.flatMap((preset) =>
		preset.variants
			.filter((variant) => includeDeprecated || !variant.deprecated)
			.map((variant) => ({
				id: variant.id,
				label:
					variant.variantType === "DEFAULT"
						? preset.name
						: `${preset.name} – ${variant.name}`,
				referenceStyleId: preset.referenceStyleID,
				variantType: variant.variantType,
				deprecated: variant.deprecated,
			})),
	);

	return dedupeMapStyleOptionsById(optionsList);
}

/** Cached options for UI (non-deprecated only). */
export const mapStyleOptions = getMapStyleOptions();

/**
 * Reference styles with their variants, for grouped UIs.
 * Uses `ReferenceMapStyle.getVariants()` from the live `MapStyle` object.
 */
export function getReferenceMapStyles(
	options: { includeDeprecated?: boolean } = {},
) {
	const { includeDeprecated = false } = options;

	return mapStylePresetList
		.map((preset) => {
			const reference = MapStyle[
				preset.referenceStyleID as keyof typeof MapStyle
			] as ReferenceMapStyle | undefined;

			if (!(reference instanceof ReferenceMapStyle)) {
				return null;
			}

			const variants = reference
				.getVariants()
				.filter((v) => includeDeprecated || !v.deprecated);

			return {
				id: preset.referenceStyleID,
				name: preset.name,
				description: preset.description,
				variants: variants.map((v) => ({
					id: v.getId(),
					label: v.getFullName(),
					variant: v,
				})),
			};
		})
		.filter((entry): entry is NonNullable<typeof entry> => entry !== null);
}

/**
 * Resolve a Cloud style id to a `MapStyleVariant` instance (or pass through the id string).
 * Prefer style ids in React state so Select values stay serializable.
 */
export function resolveMapStyle(
	styleId: MapStyleId,
): MapStyleId | MapStyleVariant {
	let bestPreset: (typeof mapStylePresetList)[number] | null = null;
	let bestMeta: (typeof mapStylePresetList)[number]["variants"][number] | null =
		null;

	for (const preset of mapStylePresetList) {
		const meta = preset.variants.find((v) => v.id === styleId);
		if (!meta) continue;

		if (
			!bestPreset ||
			referenceStyleVersion(preset.referenceStyleID) >=
				referenceStyleVersion(bestPreset.referenceStyleID)
		) {
			bestPreset = preset;
			bestMeta = meta;
		}
	}

	if (bestPreset && bestMeta) {
		const reference = MapStyle[
			bestPreset.referenceStyleID as keyof typeof MapStyle
		] as ReferenceMapStyle | undefined;

		if (reference instanceof ReferenceMapStyle) {
			return reference.getVariant(bestMeta.variantType);
		}
	}

	return styleId;
}
