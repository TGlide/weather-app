import { render } from "@testing-library/react";
import { createStore, StoreProvider } from "easy-peasy";
import React from "react";
import { mockCity, mockCityKey } from "../../mocks/city";
import { storeModel } from "../../store";
import FavoritesList from "../FavoritesList";

const store = createStore(storeModel);
const favorites = { [mockCityKey]: mockCity };

const EmptyList = (
  <StoreProvider store={store}>
    <FavoritesList favorites={{}} />
  </StoreProvider>
);

const List = (
  <StoreProvider store={store}>
    <FavoritesList favorites={favorites} />
  </StoreProvider>
);

test("renders city cards", () => {
  const { getByTestId, queryByTestId } = render(List);

  const listEl = getByTestId("city-list");
  expect(listEl.children.length).toEqual(1);
  expect(queryByTestId("empty-list")).toBeFalsy();
});

test("renders empty list message", () => {
  const { queryByTestId, getByTestId } = render(EmptyList);

  const listEl = getByTestId("city-list");
  expect(listEl.children.length).toEqual(0);
  expect(queryByTestId("empty-list")).toBeTruthy();
});
