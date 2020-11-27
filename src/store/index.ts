import {
  computed,
  Computed,
  createStore,
  createTypedHooks,
  persist,
} from "easy-peasy";
import { Location } from "../entities/Location";
import { favoritesModel, FavoritesModel } from "./models/favorites";
import { largestCitiesModel, LargestCitiesModel } from "./models/largestCities";
import { locationModel, LocationModel } from "./models/location";
import { NotesModel, notesModel } from "./models/notes";
import { SelectedCityModel, selectedCityModel } from "./models/selectedCity";

interface StoreModel {
  location: LocationModel;
  largestCities: LargestCitiesModel;
  selectedCity: SelectedCityModel;
  notes: NotesModel;
  selectedNotes: Computed<StoreModel, string[]>;
  favorites: FavoritesModel;
}

export const store = createStore<StoreModel>({
  location: persist(locationModel),
  largestCities: persist(largestCitiesModel, { storage: "localStorage" }),
  selectedCity: selectedCityModel,
  notes: persist(notesModel, { storage: "localStorage" }),
  selectedNotes: computed((state) => {
    if (!state.selectedCity.data.address) return [];

    const key = Location.getKey(state.selectedCity.data.address);
    return state.notes.data[key];
  }),
  favorites: persist(favoritesModel, { storage: "localStorage" }),
});

// store.persist.clear().then(() => {
//   console.log("Persisted state has been removed");
// });

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
