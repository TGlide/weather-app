import {
  computed,
  Computed,
  createStore,
  createTypedHooks,
  persist,
} from "easy-peasy";
import { locationModel, LocationModel } from "./models/location";
import { NotesModel, notesModel } from "./models/notes";
import { SelectedCityModel, selectedCityModel } from "./models/selectedCity";

interface StoreModel {
  location: LocationModel;
  selectedCity: SelectedCityModel;
  notes: NotesModel;
  selectedNotes: Computed<StoreModel, string[]>;
}

export const store = createStore<StoreModel>({
  location: persist(locationModel),
  selectedCity: selectedCityModel,
  notes: persist(notesModel, { storage: "localStorage" }),
  selectedNotes: computed((state) => {
    if (!state.selectedCity.data.address) return [];
    const key = state.selectedCity.data.address.getKey();
    return state.notes.data[key];
  }),
});

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
