import React from "react";
import "./App.scss";
import CityDetails from "./components/CityDetails";
import CityList from "./components/CityList";
import CurrentWeather from "./components/CurrentWeather";
import FavoritesList from "./components/FavoritesList";
import Search from "./components/Search";
import { usePosition } from "./hooks/usePosition";

function App() {
  const { coords, error: posError } = usePosition();

  return (
    <div className="App">
      <CurrentWeather coords={coords} error={posError} />
      <Search />
      <FavoritesList />
      <CityList />

      <CityDetails />
    </div>
  );
}

export default App;
