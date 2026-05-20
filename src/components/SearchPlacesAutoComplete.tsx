import type { Coords } from "../types";
import PlaceSearch from "./ui/place-search";

type SearchPlacesAutoCompleteProps = Readonly<{
	handleSetCoordinates: (coords: Coords) => void;
}>;

export default function SearchPlacesAutoComplete({
	handleSetCoordinates,
}: SearchPlacesAutoCompleteProps) {
	return (
		<div className="w-full min-w-0 sm:mx-auto sm:w-[30%]">
			<PlaceSearch onSelect={handleSetCoordinates} />
		</div>
	);
}
