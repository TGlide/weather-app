import { Action, action } from "easy-peasy";
import { Location } from "../../entities/Location";

export interface NotesModel {
  data: { [key: string]: string[] };
  add: Action<NotesModel, { location: Location; note: string }>;
  delete: Action<NotesModel, { location: Location; index: number }>;
}

export const notesModel: NotesModel = {
  data: {},
  add: action((state, payload) => {
    const key = payload.location.getKey();
    if (state.data[key]) state.data[key].push(payload.note);
    else state.data[key] = [payload.note];
  }),
  delete: action((state, payload) => {
    const key = payload.location.getKey();
    if (!state.data[key]) return;
    state.data[key].splice(payload.index, 1);
  }),
};
