import { action, Action } from "easy-peasy";
import { City } from "../../entities/City";
import { Location } from "../../entities/Location";

export interface FavoritesModel {
  data: { [key: string]: City };
  add: Action<FavoritesModel, City>;
  delete: Action<FavoritesModel, City>;
  toggle: Action<FavoritesModel, City>;
}

export const favoritesModel: FavoritesModel = {
  data: {},
  add: action((state, payload) => {
    const key = Location.getKey(payload.location);
    state.data[key] = payload;
  }),
  delete: action((state, payload) => {
    const key = Location.getKey(payload.location);
    delete state.data[key];
  }),
  toggle: action((state, payload) => {
    const key = Location.getKey(payload.location);
    if (Object.keys(state.data).includes(key)) delete state.data[key];
    else state.data[key] = payload;
  }),
};
