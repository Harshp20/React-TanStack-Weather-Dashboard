import type { z } from "zod";
import {
	ReverseGeocodeSchema,
	WeatherResponseSchema,
	type ReverseGeocode,
	type WeatherData,
} from "./schemas/weather-data-schema";
import type { Coords } from "./types";

const BASE_URL = "https://api.openweathermap.org";
const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

function parseApiResponse<T>(
	schema: z.ZodType<T>,
	data: unknown,
	label: string,
): T {
	const result = schema.safeParse(data);
	if (!result.success) {
		console.error(`Invalid ${label} response`, result.error.flatten());
		throw new Error(`Invalid ${label} response`);
	}
	return result.data;
}

export async function getWeatherData({ lat, lng }: Coords): Promise<WeatherData> {
	const res = await fetch(
		`${BASE_URL}/data/3.0/onecall?lat=${lat}&lon=${lng}&units=metric&exclude=minutely,alerts&appid=${OPENWEATHER_API_KEY}`,
	);
	const data = await res.json();
	return parseApiResponse(WeatherResponseSchema, data, "weather");
}

export async function reverseGeocodeFromCoords(
	{ lat, lng }: Coords,
	limit = 5,
): Promise<ReverseGeocode> {
	const res = await fetch(
		`${BASE_URL}/geo/1.0/reverse?lat=${lat}&lon=${lng}&limit=${limit}&appid=${OPENWEATHER_API_KEY}`,
	);
	const data = await res.json();
	return parseApiResponse(ReverseGeocodeSchema, data, "reverse geocode");
}
