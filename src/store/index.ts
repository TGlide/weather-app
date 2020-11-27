import {
  computed,
  Computed,
  createStore,
  createTypedHooks,
  persist,
} from "easy-peasy";
import { Location } from "../entities/Location";
import { userCityModel, UserCityModel } from "./models/userCity";
import { favoritesModel, FavoritesModel } from "./models/favorites";
import { largestCitiesModel, LargestCitiesModel } from "./models/largestCities";
import { NotesModel, notesModel } from "./models/notes";
import { SelectedCityModel, selectedCityModel } from "./models/selectedCity";

interface StoreModel {
  userCity: UserCityModel;
  largestCities: LargestCitiesModel;
  selectedCity: SelectedCityModel;
  notes: NotesModel;
  selectedNotes: Computed<StoreModel, string[]>;
  favorites: FavoritesModel;
}

export const storeModel: StoreModel = {
  userCity: persist(userCityModel),
  largestCities: persist(largestCitiesModel, { storage: "localStorage" }),
  selectedCity: selectedCityModel,
  notes: persist(notesModel, { storage: "localStorage" }),
  selectedNotes: computed((state) => {
    if (!state.selectedCity.data) return [];

    const key = Location.getKey(state.selectedCity.data.location);
    return state.notes.data[key];
  }),
  favorites: persist(favoritesModel, { storage: "localStorage" }),
};

export const store = createStore<StoreModel>(storeModel);

// store.persist.clear().then(() => {
//   console.log("Persisted state has been removed");
// });

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
