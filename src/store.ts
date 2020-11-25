import {
  Action,
  action,
  createStore,
  createTypedHooks,
  persist,
} from "easy-peasy";
import { AddressResponse } from "./api/getAddress";
import { WeatherResponse } from "./api/getWeather";

interface LocationData {
  weather?: WeatherResponse;
  address?: AddressResponse;
}

interface StoreModel {
  location: LocationData;
  setWeather: Action<StoreModel, WeatherResponse>;
  setAddress: Action<StoreModel, AddressResponse>;
}

export const store = createStore<StoreModel>({
  location: persist({}, { storage: "localStorage" }),
  setWeather: action((state, payload) => {
    state.location.weather = payload;
  }),
  setAddress: action((state, payload) => {
    state.location.address = payload;
  }),
});

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
