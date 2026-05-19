import { z } from "zod";

/** OpenWeather may omit or null out fields depending on conditions (e.g. no wind gust, polar sunrise). */
const apiNumber = z.number().nullish();

const weatherConditionSchema = z.object({
	id: z.number(),
	main: z.string(),
	description: z.string(),
	icon: z.string(),
});

const precipitationSchema = z
	.object({
		"1h": z.number(),
	})
	.optional();

export const WeatherResponseSchema = z.object({
	lat: z.number(),
	lon: z.number(),

	timezone: z.string(),
	timezone_offset: z.number(),

	current: z.object({
		dt: z.number(),
		sunrise: apiNumber,
		sunset: apiNumber,

		temp: z.number(),
		feels_like: z.number(),

		pressure: z.number(),
		humidity: z.number(),
		dew_point: z.number(),

		uvi: z.number(),
		clouds: z.number(),
		visibility: apiNumber,

		wind_speed: z.number(),
		wind_deg: z.number(),
		wind_gust: apiNumber,

		weather: z.array(weatherConditionSchema),

		rain: precipitationSchema,
	}),

	hourly: z.array(
		z.object({
			dt: z.number(),

			temp: z.number(),
			feels_like: z.number(),

			pressure: z.number(),
			humidity: z.number(),
			dew_point: z.number(),

			uvi: z.number(),
			clouds: z.number(),
			visibility: apiNumber,

			wind_speed: z.number(),
			wind_deg: z.number(),
			wind_gust: apiNumber,

			weather: z.array(weatherConditionSchema),

			pop: z.number(),

			rain: precipitationSchema,
		}),
	),

	daily: z.array(
		z.object({
			dt: z.number(),

			sunrise: apiNumber,
			sunset: apiNumber,

			moonrise: apiNumber,
			moonset: apiNumber,
			moon_phase: z.number(),

			summary: z.string(),

			temp: z.object({
				day: z.number(),
				min: z.number(),
				max: z.number(),
				night: z.number(),
				eve: z.number(),
				morn: z.number(),
			}),

			feels_like: z.object({
				day: z.number(),
				night: z.number(),
				eve: z.number(),
				morn: z.number(),
			}),

			pressure: z.number(),
			humidity: z.number(),
			dew_point: z.number(),

			wind_speed: z.number(),
			wind_deg: z.number(),
			wind_gust: apiNumber,

			weather: z.array(weatherConditionSchema),

			clouds: z.number(),
			pop: z.number(),

			rain: apiNumber,

			uvi: z.number(),
		}),
	),
});

export type WeatherData = z.infer<typeof WeatherResponseSchema>;

export const ReverseGeocodeSchema = z.array(
	z.object({
		name: z.string(),
		local_names: z.record(z.string(), z.string()).optional(),
		lat: z.number(),
		lon: z.number(),
		country: z.string(),
		state: z.string().optional(),
	}),
);

export type ReverseGeocode = z.infer<typeof ReverseGeocodeSchema>;
