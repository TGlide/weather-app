import { render } from "@testing-library/react";
import { createStore, StoreProvider } from "easy-peasy";
import React from "react";
import CityList from ".";
import { mockCity } from "../../mocks/city";
import { storeModel } from "../../store";

const store = createStore(storeModel);
const EmptyList = (
  <StoreProvider store={store}>
    <CityList cities={[]} />
  </StoreProvider>
);

const List = (
  <StoreProvider store={store}>
    <CityList cities={[mockCity]} />
  </StoreProvider>
);

test("renders city cards", () => {
  const { getByTestId, queryByTestId } = render(List);

  const listEl = getByTestId("city-list");
  expect(listEl.children.length).toEqual(1);
  expect(queryByTestId("loading")).toBeFalsy();
});

test("renders loading message", () => {
  const { queryByTestId } = render(EmptyList);

  expect(queryByTestId("loading")).toBeTruthy();
});
