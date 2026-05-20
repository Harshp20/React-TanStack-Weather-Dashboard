import { Suspense } from "react";
import AdditionalWeatherInfo from "./components/AdditionalWeatherInfo";
import AppToaster from "./components/AppToaster";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import MainMap from "./components/MainMap";
import { ModeToggle } from "./components/mode-toggle";
import SearchPlacesAutoComplete from "./components/SearchPlacesAutoComplete";
import AdditionalWeatherInfoSkeleton from "./components/skeletons/AdditionalWeatherInfoSkeleton";
import DailyForecastSkeleton from "./components/skeletons/DailyForecastSkeleton";
import DashboardSkeleton from "./components/skeletons/DashboardSkeleton";
import HourlyForecastSkeleton from "./components/skeletons/HourlyForecastSkeleton";
import SearchPlacesSkeleton from "./components/skeletons/SearchPlacesSkeleton";
import { useCoords } from "./hooks/useCoords";

function App() {
	const { coords, isLoading, setCoords } = useCoords();
	const isResolvingLocation = isLoading || !coords;

	return (
		<main className="min-h-screen bg-dashboard-bg text-dashboard-fg">
			<div className="mx-auto flex w-full max-w-7xl flex-col gap-section p-page sm:gap-section-lg sm:p-page-md lg:p-page-lg">
				<header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
					{isResolvingLocation ? (
						<SearchPlacesSkeleton />
					) : (
						<SearchPlacesAutoComplete handleSetCoordinates={setCoords} />
					)}
					<div className="flex justify-end sm:justify-start">
						<ModeToggle />
					</div>
				</header>

				{isResolvingLocation ? (
					<DashboardSkeleton />
				) : (
					<>
						<MainMap coords={coords} handleSetCoordinates={setCoords} />
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
