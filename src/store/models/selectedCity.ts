import { Action, action } from "easy-peasy";
import { City } from "../../entities/City";

export interface SelectedCityModel {
  data?: City;
  set: Action<SelectedCityModel, City>;
  clear: Action<SelectedCityModel>;
}

export const selectedCityModel: SelectedCityModel = {
  data: undefined,
  set: action((state, payload) => {
    state.data = payload;
  }),
  clear: action((state) => {
    state.data = undefined;
  }),
};
