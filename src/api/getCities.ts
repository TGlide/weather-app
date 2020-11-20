import axios, { AxiosResponse } from "axios";

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
