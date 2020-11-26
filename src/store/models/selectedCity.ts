import { Action, action } from "easy-peasy";
import { WeatherResponse } from "../../api/getWeather";
import { Location } from "../../entities/Location";

export interface SelectedCityModel {
  data: {
    weather?: WeatherResponse;
    address?: Location;
  };
  setWeather: Action<SelectedCityModel, WeatherResponse>;
  setAddress: Action<SelectedCityModel, Location>;
  set: Action<
    SelectedCityModel,
    {
      weather?: WeatherResponse;
      address?: Location;
    }
  >;
  clear: Action<SelectedCityModel>;
}

export const selectedCityModel: SelectedCityModel = {
  data: {},
  setWeather: action((state, payload) => {
    state.data.weather = payload;
  }),
  setAddress: action((state, payload) => {
    state.data.address = payload;
  }),
  set: action((state, payload) => {
    state.data = payload;
  }),
  clear: action((state) => {
    state.data = {};
  }),
};
