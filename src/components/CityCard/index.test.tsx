import { render } from "@testing-library/react";
import { createStore, StoreProvider } from "easy-peasy";
import React from "react";
import CityCard from ".";
import { mockCity } from "../../mocks/city";
import { storeModel } from "../../store";

const store = createStore(storeModel);
const Card = (
  <StoreProvider store={store}>
    <CityCard city={mockCity} />
  </StoreProvider>
);

const RemoveableCard = (
  <StoreProvider store={store}>
    <CityCard city={mockCity} removeable={true} />
  </StoreProvider>
);

test("renders correct name", () => {
  const { getByTestId } = render(Card);

  const nameEl = getByTestId("city-name");
  expect(nameEl.textContent).toEqual(mockCity.location.name);
});

test("renders correct country", () => {
  const { getByTestId } = render(Card);

  const countryEl = getByTestId("country-name");
  expect(countryEl.textContent).toEqual(mockCity.location.country);
});

test("renders correct weather", () => {
  const { getByTestId } = render(Card);

  const mockTemperature = `${Math.round(mockCity.weather?.current.temp || 0)}°`;
  const tempEl = getByTestId("temp");
  expect(tempEl.textContent).toEqual(mockTemperature);
});

test("should not render close button", () => {
  const { queryByTestId } = render(Card);

  expect(queryByTestId("close-btn")).toBeFalsy();
});

test("should render close button", () => {
  const { queryByTestId } = render(RemoveableCard);

  expect(queryByTestId("close-btn")).toBeTruthy();
});
