import axios, { AxiosResponse } from "axios";

export interface GetWeatherParams {
  latitude: number;
  longitude: number;
}

export interface WeatherResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: Current;
  daily: Daily[];
}

export interface Current {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: Weather[];
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Daily {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: Temp;
  feels_like: FeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  weather: Weather[];
  clouds: number;
  pop: number;
  uvi: number;
  rain?: number;
}

export interface FeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface Temp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export const getWeather = ({
  latitude,
  longitude,
}: GetWeatherParams): Promise<AxiosResponse<WeatherResponse>> => {
  const { REACT_APP_WEATHER_API_KEY: apiKey } = process.env;

  return axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?appId=${apiKey}&lat=${latitude}&lon=${longitude}&units=metric`
  );
};
