import axios, { AxiosResponse } from "axios";
import { City } from "../entities/City";
import { Location } from "../entities/Location";
import { Weather } from "../entities/Weather";
import { sleep } from "../utils/time";
import { getWeather } from "./getWeather";

export interface CitiesResponse {
  data: CityDatum[];
  links: Link[];
  metadata: Metadata;
}

export interface CityDatum {
  id: number;
  wikiDataId: string;
  type: string;
  city: string;
  name: string;
  country: string;
  countryCode: string;
  region: string;
  regionCode: string;
  latitude: number;
  longitude: number;
}

export interface Link {
  rel: string;
  href: string;
}

export interface Metadata {
  currentOffset: number;
  totalCount: number;
}

export const getCitiesByPopulation = (
  offset?: number
): Promise<AxiosResponse<CitiesResponse>> => {
  const { REACT_APP_GEODB_API_KEY } = process.env;
  const options = {
    params: { limit: "5", offset: offset || 0, sort: "-population" },
    headers: {
      "x-rapidapi-key": REACT_APP_GEODB_API_KEY,
      "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
    },
  };

  return axios.get("https://wft-geo-db.p.rapidapi.com/v1/geo/cities", options);
};

export const getLargestCities = async () => {
  const cities: City[] = [];
  const cityDatums: CityDatum[] = [];

  for (let offset = 0; offset <= 10; offset += 5) {
    const response = await getCitiesByPopulation(offset);
    cityDatums.push(...response.data.data);
    await sleep(2000);
  }

  cityDatums.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  for (const cityDatum of cityDatums) {
    const weatherResp = await getWeather({
      latitude: cityDatum.latitude,
      longitude: cityDatum.longitude,
    });
    const city = new City(
      Location.fromCityDatum(cityDatum),
      Weather.fromWeatherResponse(weatherResp.data)
    );
    cities.push(city);
  }

  return cities;
};
