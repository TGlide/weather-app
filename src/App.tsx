import React from "react";
import "./App.scss";
import CurrentWeather from "./components/CurrentWeather";
import { usePosition } from "./hooks/usePosition";

function App() {
  const { coords, error: posError } = usePosition();

  return (
    <div className="App">
      <CurrentWeather coords={coords} error={posError} />
    </div>
  );
}

export default App;
