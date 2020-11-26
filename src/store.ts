import {
  Action,
  action,
  createStore,
  createTypedHooks,
  persist,
} from "easy-peasy";
import { WeatherResponse } from "./api/getWeather";
import { Location } from "./entities/Location";

interface LocationData {
  weather?: WeatherResponse;
  address?: Location;
}

interface StoreModel {
  location: LocationData;
  setWeather: Action<StoreModel, WeatherResponse>;
  setAddress: Action<StoreModel, Location>;

  selectedCity: LocationData;
  setSelectedWeather: Action<StoreModel, WeatherResponse>;
  setSelectedAddress: Action<StoreModel, Location>;
  setSelectedCity: Action<StoreModel, LocationData>;
  clearSelectedCity: Action<StoreModel>;
}

export const store = createStore<StoreModel>({
  location: persist({}, { storage: "sessionStorage" }),
  selectedCity: {},
  setWeather: action((state, payload) => {
    state.location.weather = payload;
  }),
  setAddress: action((state, payload) => {
    state.location.address = payload;
  }),
  setSelectedWeather: action((state, payload) => {
    state.selectedCity.weather = payload;
  }),
  setSelectedAddress: action((state, payload) => {
    state.selectedCity.address = payload;
  }),
  setSelectedCity: action((state, payload) => {
    state.selectedCity = payload;
  }),
  clearSelectedCity: action((state) => {
    state.selectedCity = {};
  }),
});

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
