import { Action, action } from "easy-peasy";
import { City } from "../../entities/City";

export interface UserCityModel {
  data?: City;
  set: Action<UserCityModel, City>;
}

export const userCityModel: UserCityModel = {
  data: undefined,
  set: action((state, payload) => {
    state.data = payload;
  }),
};
