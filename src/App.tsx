import React from "react";
import "./App.scss";
import CityList from "./components/CityList";
import CurrentWeather from "./components/CurrentWeather";
import Search from "./components/Search";
import { usePosition } from "./hooks/usePosition";

function App() {
  const { coords, error: posError } = usePosition();

  return (
    <div className="App" style={{ overflowY: "scroll" }}>
      <CurrentWeather coords={coords} error={posError} />
      <Search />
      <CityList />
    </div>
  );
}

export default App;
