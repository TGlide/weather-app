import { action, Action } from "easy-peasy";
import { Location } from "../../entities/Location";

export interface FavoritesModel {
  data: { [key: string]: Location };
  add: Action<FavoritesModel, Location>;
  delete: Action<FavoritesModel, Location>;
  toggle: Action<FavoritesModel, Location>;
}

export const favoritesModel: FavoritesModel = {
  data: {},
  add: action((state, payload) => {
    const key = Location.getKey(payload);
    state.data[key] = payload;
  }),
  delete: action((state, payload) => {
    const key = Location.getKey(payload);
    delete state.data[key];
  }),
  toggle: action((state, payload) => {
    const key = Location.getKey(payload);
    if (Object.keys(state.data).includes(key)) delete state.data[key];
    else state.data[key] = payload;
  }),
};
