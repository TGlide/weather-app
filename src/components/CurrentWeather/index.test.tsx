import { render } from "@testing-library/react";
import { createStore, StoreProvider } from "easy-peasy";
import React from "react";
import CurrentWeather from ".";
import { mockCity } from "../../mocks/city";
import { storeModel } from "../../store";

const store = createStore(storeModel);

const errorMsg = "Test Error";

const ErrorComponent = (
  <StoreProvider store={store}>
    <CurrentWeather error={errorMsg} />
  </StoreProvider>
);

const LoadingComponent = (
  <StoreProvider store={store}>
    <CurrentWeather />
  </StoreProvider>
);

const Component = (
  <StoreProvider store={store}>
    <CurrentWeather userCity={mockCity} />
  </StoreProvider>
);

test("renders error text", () => {
  const { getByTestId } = render(ErrorComponent);

  const errorEl = getByTestId("error");

  expect(errorEl.textContent).toEqual(errorMsg);
});

test("renders loading text", () => {
  const { queryByTestId } = render(LoadingComponent);

  expect(queryByTestId("loading")).toBeTruthy();
});

test("renders correct location", () => {
  const { getByTestId } = render(Component);

  const nameEl = getByTestId("location-name");

  expect(nameEl.textContent).toEqual(mockCity.location.name);
});

test("renders correct weather", () => {
  const { getByTestId } = render(Component);

  const mockTemp = `${Math.round(mockCity.weather?.current.temp || 0)}°`;
  const tempEl = getByTestId("temp");

  expect(tempEl.textContent).toEqual(mockTemp);
});
