import axios, { AxiosResponse } from "axios";
import { LocationResponse } from "./types/LocationResponse";

export const searchLocations = (
  name: string
): Promise<AxiosResponse<LocationResponse>> => {
  const { REACT_APP_GEO_API_KEY: apiKey } = process.env;

  return axios.get(
    `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${name}`
  );
};
