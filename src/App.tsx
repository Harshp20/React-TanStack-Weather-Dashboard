import AdditionalWeatherInfo from "./components/AdditionalWeatherInfo";
import CurrentWeather from "./components/CurrentWeather";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import MapWrapper from "./components/MapWrapper";
import { useWeatherData } from "./hooks/useWeatherData";

function App() {
	const weatherData = useWeatherData();

	return (
		<main className="min-h-screen bg-mist-700 text-white">
			<h1 className="text-2xl tracking-wide">Weather Dashboard</h1>
			{weatherData.data && (
				<div className="flex max-w-screen flex-col gap-6 p-8">
					<MapWrapper />
					<AdditionalWeatherInfo />
					<CurrentWeather />
					<HourlyForecast />
					<DailyForecast />
				</div>
			)}
		</main>
	);
}

export default App;
