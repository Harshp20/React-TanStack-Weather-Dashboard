import type { Coords } from "../types";
import PlaceSearch from "./ui/place-search";

type SearchPlacesAutoCompleteProps = Readonly<{
	handleSetCoordinates: (coords: Coords) => void;
}>;

export default function SearchPlacesAutoComplete({
	handleSetCoordinates,
}: SearchPlacesAutoCompleteProps) {
	return (
		<div className="flex-center">
			<PlaceSearch onSelect={handleSetCoordinates} />
		</div>
	);
}
