import { render } from "@testing-library/react";
import { createStore, StoreProvider } from "easy-peasy";
import React from "react";
import CityDetails from ".";
import { mockCity, mockCityKey } from "../../mocks/city";
import { storeModel } from "../../store";

const store = createStore(storeModel);
const Component = (
  <StoreProvider store={store}>
    <CityDetails
      selectedCity={mockCity}
      notes={["Test"]}
      favorites={{ [mockCityKey]: mockCity }}
    />
  </StoreProvider>
);

const EmptyComponent = (
  <StoreProvider store={store}>
    <CityDetails selectedCity={mockCity} notes={[]} favorites={{}} />
  </StoreProvider>
);

test("renders correct name", () => {
  const { getByTestId } = render(Component);

  const nameEl = getByTestId("name");
  expect(nameEl.textContent).toEqual(mockCity.location.name);
});

test("renders favorite", () => {
  const { getByTestId } = render(Component);

  const starEl = getByTestId("star");
  expect(starEl.className.includes("filled")).toBeTruthy();
});

test("does not render favorite", () => {
  const { getByTestId } = render(EmptyComponent);

  const starEl = getByTestId("star");
  expect(starEl.className.includes("filled")).toBeFalsy();
});

test("renders weather", () => {
  const { getByTestId } = render(Component);

  const mockTemp = `${Math.round(mockCity.weather?.current.temp || 0)}°`;
  const mockFeels = `Feels like ${Math.round(
    mockCity.weather?.current.feels_like || 0
  )}°`;

  const tempEl = getByTestId("temp");
  const feelsEl = getByTestId("feels");
  expect(tempEl.textContent).toEqual(mockTemp);
  expect(feelsEl.textContent).toEqual(mockFeels);
});

test("renders notes", () => {
  const { getByTestId } = render(Component);

  const noteList = getByTestId("note-list");
  expect(noteList.children.length).toEqual(1);
});

test("does not render notes", () => {
  const { getByTestId } = render(EmptyComponent);

  const noteList = getByTestId("note-list");
  expect(noteList.children.length).toEqual(0);
});
