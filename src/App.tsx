import React, { useEffect } from "react";
import "./App.scss";
import CurrentWeather from "./components/CurrentWeather";
import { usePosition } from "./hooks/usePosition";

function App() {
  const { coords, error: posError } = usePosition();
  useEffect(() => {
    console.log("coords", coords);
    console.log("poserror", posError);
  }, [coords, posError]);

  return (
    <div className="App">
      <CurrentWeather coords={coords} error={posError} />
    </div>
  );
}

export default App;
