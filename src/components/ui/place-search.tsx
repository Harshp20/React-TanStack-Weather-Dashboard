import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
	Autocomplete,
	Box,
	Chip,
	CircularProgress,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { useCallback, useRef, useState } from "react";

interface NominatimPlace {
	place_id: number;
	display_name: string;
	lat: string;
	lon: string;
	type: string;
	class: string;
}

export interface PlaceResult {
	name: string;
	lat: number;
	lng: number;
	displayName: string;
	type: string;
}

type PlaceSearchProps = Readonly<{
	onSelect?: (place: PlaceResult) => void;
	placeholder?: string;
}>;

function HighlightedText({
	text,
	query,
}: Readonly<{ text: string; query: string }>) {
	if (!query.trim()) return <>{text}</>;

	const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const regex = new RegExp(`(${escaped})`, "gi");
	const parts = text.split(regex);

	const keyedParts = parts.map((part, i) => ({
		part,
		isMatch: i % 2 === 1,
		key: `${parts.slice(0, i).reduce((sum, p) => sum + p.length, 0)}-${part}`,
	}));

	return (
		<>
			{keyedParts.map(({ part, isMatch, key }) =>
				isMatch ? (
					<Box
						component="span"
						key={key}
						sx={{ fontWeight: 700, color: "#ff771c" }}
					>
						{part}
					</Box>
				) : (
					<span key={key}>{part}</span>
				),
			)}
		</>
	);
}

export default function PlaceSearch({
	onSelect,
	placeholder = "Search for a place...",
}: PlaceSearchProps) {
	const [query, setQuery] = useState("");
	const [options, setOptions] = useState<NominatimPlace[]>([]);
	const [loading, setLoading] = useState(false);
	const [selectedPlace, setSelectedPlace] = useState<PlaceResult | null>(null);
	const abortRef = useRef<AbortController | null>(null);
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const searchPlaces = useCallback((searchQuery: string) => {
		if (debounceRef.current) {
			clearTimeout(debounceRef.current);
		}

		if (searchQuery.length < 3) {
			setOptions([]);
			setLoading(false);
			return;
		}

		setLoading(true);

		debounceRef.current = setTimeout(async () => {
			abortRef.current?.abort();
			const controller = new AbortController();
			abortRef.current = controller;

			try {
				const response = await fetch(
					`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
						searchQuery,
					)}&format=json&limit=6&addressdetails=1`,
					{ signal: controller.signal },
				);

				if (!controller.signal.aborted) {
					const data = await response.json();
					setOptions(data);
					setLoading(false);
				}
			} catch {
				if (!controller.signal.aborted) {
					setOptions([]);
					setLoading(false);
				}
			}
		}, 400);
	}, []);

	const surfaceSx = {
		bgcolor: "var(--color-mist-800)",
		color: "white",
		border: "1px solid var(--color-gray-700)",
		borderRadius: "12px",
	} as const;

	return (
		<Box sx={{ width: "50%", maxWidth: "100%" }}>
			<Autocomplete
				fullWidth
				freeSolo
				sx={{
					"& .MuiAutocomplete-popupIndicator, & .MuiAutocomplete-clearIndicator":
						{
							color: "rgba(255,255,255,0.5)",
						},
					"& .MuiAutocomplete-noOptions": {
						color: "rgba(255,255,255,0.5)",
					},
				}}
				filterOptions={(x) => x}
				options={options}
				getOptionLabel={(option) =>
					typeof option === "string" ? option : option.display_name
				}
				loading={loading}
				inputValue={query}
				onInputChange={(_event, newValue) => {
					setQuery(newValue);
					searchPlaces(newValue);
				}}
				onChange={(_event, newValue) => {
					if (newValue && typeof newValue !== "string") {
						const place: PlaceResult = {
							name: newValue.display_name.split(",")[0],
							lat: Number.parseFloat(newValue.lat),
							lng: Number.parseFloat(newValue.lon),
							displayName: newValue.display_name,
							type: newValue.type,
						};
						setSelectedPlace(place);
						onSelect?.(place);
					}
				}}
				renderOption={(props, option, { inputValue }) => {
					const { key, ...rest } = props as { key: string } & Record<
						string,
						unknown
					>;
					const mainName = option.display_name.split(",")[0];
					const restOfAddress = option.display_name.slice(mainName.length + 2);

					return (
						<Box
							component="li"
							key={key}
							{...rest}
							sx={{
								"&.MuiAutocomplete-option": {
									px: 2,
									py: 1.5,
									color: "white",
									"&[aria-selected='true']": {
										bgcolor: "rgba(255,255,255,0.08)",
									},
									"&.Mui-focused": {
										bgcolor: "rgba(255,255,255,0.08)",
									},
								},
							}}
						>
							<LocationOnIcon
								sx={{
									mr: 1.5,
									mt: 0.5,
									color: "rgba(255,255,255,0.5)",
									fontSize: 20,
								}}
							/>
							<Box sx={{ minWidth: 0 }}>
								<Typography variant="body2" noWrap>
									<HighlightedText text={mainName} query={inputValue} />
								</Typography>
								<Typography
									variant="caption"
									sx={{
										color: "rgba(255,255,255,0.5)",
										display: "block",
										overflow: "hidden",
										textOverflow: "ellipsis",
										whiteSpace: "nowrap",
									}}
								>
									<HighlightedText text={restOfAddress} query={inputValue} />
								</Typography>
							</Box>
						</Box>
					);
				}}
				renderInput={(params) => (
					<TextField
						{...params}
						placeholder={placeholder}
						slotProps={{
							...params.slotProps,
							input: {
								...params.slotProps.input,
								endAdornment: (
									<>
										{loading ? (
											<CircularProgress
												size={20}
												sx={{ color: "rgba(255,255,255,0.5)" }}
											/>
										) : null}
										{params.slotProps.input.endAdornment}
									</>
								),
							},
						}}
						sx={{
							"& .MuiOutlinedInput-root": {
								...surfaceSx,
								"& fieldset": {
									borderColor: "var(--color-gray-700)",
								},
								"&:hover fieldset": {
									borderColor: "var(--color-gray-600)",
								},
								"&.Mui-focused fieldset": {
									borderColor: "#ff771c",
								},
							},
							"& .MuiInputBase-input": {
								color: "white",
								"&::placeholder": {
									color: "rgba(255,255,255,0.5)",
									opacity: 1,
								},
							},
						}}
					/>
				)}
				noOptionsText={
					query.length < 3 ? "Type at least 3 characters" : "No places found"
				}
				slotProps={{
					paper: {
						elevation: 8,
						sx: {
							...surfaceSx,
							mt: 1,
							boxShadow: "0 4px 6px -2px rgba(0,0,0,0.3)",
						},
					},
					listbox: {
						sx: { p: 0.5 },
					},
				}}
			/>

			{/* NOTE: Info card for selected location */}
			{/* {selectedPlace && (
				<Paper
					elevation={0}
					sx={{
						...surfaceSx,
						mt: 2,
						p: 3,
						boxShadow: "0 4px 6px -2px rgba(0,0,0,0.3)",
					}}
				>
					<Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
						{selectedPlace.name}
					</Typography>

					<Typography
						variant="body2"
						sx={{ mb: 2, lineHeight: 1.6, color: "rgba(255,255,255,0.5)" }}
					>
						{selectedPlace.displayName}
					</Typography>

					<Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
						<Chip
							icon={<LocationOnIcon sx={{ color: "rgba(255,255,255,0.75) !important" }} />}
							label={`${selectedPlace.lat.toFixed(6)}, ${selectedPlace.lng.toFixed(6)}`}
							size="small"
							variant="outlined"
							sx={{
								fontFamily: "monospace",
								fontSize: "0.75rem",
								borderRadius: 1.5,
								color: "rgba(255,255,255,0.75)",
								borderColor: "var(--color-gray-600)",
							}}
						/>
						<Chip
							label={selectedPlace.type}
							size="small"
							variant="outlined"
							sx={{
								borderRadius: 1.5,
								textTransform: "capitalize",
								color: "rgba(255,255,255,0.75)",
								borderColor: "var(--color-gray-600)",
							}}
						/>
					</Box>
				</Paper>
			)} */}
		</Box>
	);
}
