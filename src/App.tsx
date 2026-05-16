import { useState } from "react";
import AdditionalWeatherInfo from "./components/AdditionalWeatherInfo";
import CurrentWeather from "./components/CurrentWeather";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import MapWrapper from "./components/MapWrapper";
import SearchPlacesAutoComplete from "./components/SearchPlacesAutoComplete";
import type { Coords } from "./types";

function App() {
	const [coords, setCoords] = useState<Coords>({
		lat: 3.029152,
		lng: 101.617733,
	});

	const handleSetCoordinates = (place: Coords) => {
		setCoords({ lat: place.lat, lng: place.lng });
	};

	return (
		<main className="min-h-screen bg-mist-700 text-white">
			<div className="flex max-w-screen flex-col gap-6 p-8">
				<SearchPlacesAutoComplete handleSetCoordinates={handleSetCoordinates} />
				<MapWrapper coords={coords} onMapClick={handleSetCoordinates} />
				<CurrentWeather coords={coords} />
				<HourlyForecast coords={coords} />
				<DailyForecast coords={coords} />
				<AdditionalWeatherInfo coords={coords} />
			</div>
		</main>
	);
}

export default App;
