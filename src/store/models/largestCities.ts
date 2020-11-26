import { Action, action } from "easy-peasy";
import { Location } from "../../entities/Location";

export interface LargestCitiesModel {
  data: Location[];
  set: Action<LargestCitiesModel, Location[]>;
}

export const largestCitiesModel: LargestCitiesModel = {
  data: [],
  set: action((state, payload) => {
    state.data = payload;
  }),
};
