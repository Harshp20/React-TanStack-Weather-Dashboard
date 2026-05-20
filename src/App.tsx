import { Suspense } from "react";
import AdditionalWeatherInfo from "./components/AdditionalWeatherInfo";
import AppToaster from "./components/AppToaster";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import MainMap from "./components/MainMap";
import SearchPlacesAutoComplete from "./components/SearchPlacesAutoComplete";
import AdditionalWeatherInfoSkeleton from "./components/skeletons/AdditionalWeatherInfoSkeleton";
import DailyForecastSkeleton from "./components/skeletons/DailyForecastSkeleton";
import DashboardSkeleton from "./components/skeletons/DashboardSkeleton";
import HourlyForecastSkeleton from "./components/skeletons/HourlyForecastSkeleton";
import { useCoords } from "./hooks/useCoords";

function App() {
	const { coords, isLoading, setCoords } = useCoords();
	const isResolvingLocation = isLoading || !coords;

	return (
		<main className="min-h-screen bg-mist-700 text-white">
			<div className="flex max-w-screen flex-col gap-6 p-8">
				{isResolvingLocation ? (
					<DashboardSkeleton />
				) : (
					<>
						<SearchPlacesAutoComplete
							handleSetCoordinates={setCoords}
						/>
						<MainMap
							coords={coords}
							handleSetCoordinates={setCoords}
						/>
						<Suspense fallback={<HourlyForecastSkeleton />}>
							<HourlyForecast coords={coords} />
						</Suspense>
						<Suspense fallback={<DailyForecastSkeleton />}>
							<DailyForecast coords={coords} />
						</Suspense>
						<Suspense fallback={<AdditionalWeatherInfoSkeleton />}>
							<AdditionalWeatherInfo coords={coords} />
						</Suspense>
					</>
				)}
			</div>
			<AppToaster />
		</main>
	);
}

export default App;
