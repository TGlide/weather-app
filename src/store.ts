import {
  Action,
  action,
  computed,
  Computed,
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

  notes: { [key: string]: string[] };
  selectedNotes: Computed<StoreModel, string[]>;
  addNote: Action<StoreModel, { location: Location; note: string }>;
  deleteNote: Action<StoreModel, { location: Location; index: number }>;
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

  notes: persist({}, { storage: "localStorage" }),
  selectedNotes: computed((state) => {
    if (!state.selectedCity.address) return [];
    const key = state.selectedCity.address.getKey();
    return state.notes[key];
  }),
  addNote: action((state, payload) => {
    const key = payload.location.getKey();
    if (state.notes[key]) state.notes[key].push(payload.note);
    else state.notes[key] = [payload.note];
  }),
  deleteNote: action((state, payload) => {
    const key = payload.location.getKey();
    if (!state.notes[key]) return;
    state.notes[key].splice(payload.index, 1);
  }),
});

// store.persist.clear().then(() => {
//   console.log("Persisted state has been removed");
// });

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
