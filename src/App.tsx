import { useState } from "react";
import AdditionalWeatherInfo from "./components/AdditionalWeatherInfo";
import CurrentWeather from "./components/CurrentWeather";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import MapWrapper from "./components/MapWrapper";
import type { Coords } from "./types";

function App() {
	const [coords, setCoords] = useState<Coords>({ lat: 50, lng: 100 });

	const onMapClick = (coords: Coords) => {
		setCoords(coords);
	};

	return (
		<main className="min-h-screen bg-mist-700 text-white">
			<h1 className="text-2xl tracking-wide">Weather Dashboard</h1>
			<div className="flex max-w-screen flex-col gap-6 p-8">
				<MapWrapper coords={coords} onMapClick={onMapClick} />
				<AdditionalWeatherInfo coords={coords} />
				<CurrentWeather coords={coords} />
				<HourlyForecast coords={coords} />
				<DailyForecast coords={coords} />
			</div>
		</main>
	);
}

export default App;
