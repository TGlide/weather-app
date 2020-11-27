import { Action, action } from "easy-peasy";
import { WeatherResponse } from "../../api/getWeather";
import { Location } from "../../entities/Location";

export interface LocationModel {
  data: {
    weather?: WeatherResponse;
    address?: Location;
  };
  setWeather: Action<LocationModel, WeatherResponse>;
  setAddress: Action<LocationModel, Location>;
}

export const locationModel: LocationModel = {
  data: {},
  setWeather: action((state, payload) => {
    state.data.weather = payload;
  }),
  setAddress: action((state, payload) => {
    state.data.address = payload;
  }),
};
