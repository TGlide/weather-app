import {
  Action,
  createStore,
  action,
  createTypedHooks,
  persist,
} from "easy-peasy";

import { AddressResponse } from "./api/getAddress";
import { CityDatum } from "./api/getCities";
import { WeatherResponse } from "./api/getWeather";

interface LocationData {
  weather?: WeatherResponse;
  address?: AddressResponse;
}

interface CityListData {
  data: CityDatum[];
}

interface StoreModel {
  location: LocationData;
  setWeather: Action<StoreModel, WeatherResponse>;
  setAddress: Action<StoreModel, AddressResponse>;
  cities: CityListData;
  setCityList: Action<StoreModel, CityDatum[]>;
}

export const store = createStore<StoreModel>({
  location: persist({}, { storage: "localStorage" }),
  setWeather: action((state, payload) => {
    state.location.weather = payload;
  }),
  setAddress: action((state, payload) => {
    state.location.address = payload;
  }),
  cities: persist({ data: [] }, { storage: "localStorage" }),
  setCityList: action((state, payload) => {
    state.cities.data = payload;
  }),
});

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
