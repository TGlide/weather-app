import { Temp, FeelsLike, WeatherResponse } from "../api/getWeather";

export interface CurrentData {
  dt: number;
  temp: number;
  feels_like: number;
  icon: string;
}

export interface DailyData {
  dt: number;
  temp: Temp;
  feels_like: FeelsLike;
  icon: string;
}

export class Weather {
  constructor(
    public lat: number,
    public lon: number,
    public current: CurrentData,
    public daily: DailyData[]
  ) {}

  static fromWeatherResponse(response: WeatherResponse) {
    const currentIcon = response.current.weather[0].icon;
    const currentData: CurrentData = {
      icon: currentIcon,
      dt: response.current.dt,
      temp: response.current.temp,
      feels_like: response.current.feels_like,
    };

    const dailyData: DailyData[] = [];

    for (let day of response.daily) {
      const dailyIcon = day.weather[0].icon;
      const { dt, feels_like, temp } = day;
      dailyData.push({
        icon: dailyIcon,
        dt,
        feels_like,
        temp,
      });
    }

    return new Weather(response.lat, response.lon, currentData, dailyData);
  }
}
