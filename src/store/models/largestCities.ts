import { Action, action } from "easy-peasy";
import { City } from "../../entities/City";

export interface LargestCitiesModel {
  data: City[];
  set: Action<LargestCitiesModel, City[]>;
}

export const largestCitiesModel: LargestCitiesModel = {
  data: [],
  set: action((state, payload) => {
    state.data = payload;
  }),
};
