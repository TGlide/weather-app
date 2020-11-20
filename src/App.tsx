import React from "react";
import "./App.scss";
import CityList from "./components/CityList";
import CurrentWeather from "./components/CurrentWeather";
import { usePosition } from "./hooks/usePosition";

function App() {
  const { coords, error: posError } = usePosition();

  return (
    <div className="App">
      <CurrentWeather coords={coords} error={posError} />
      <CityList />
    </div>
  );
}

export default App;
