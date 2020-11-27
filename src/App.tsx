import React, { useEffect } from "react";
import { getAddress } from "./api/getAddress";
import { getLargestCities } from "./api/getCities";
import { getWeather } from "./api/getWeather";
import "./App.scss";
import CityDetails from "./components/CityDetails";
import CityList from "./components/CityList";
import CurrentWeather from "./components/CurrentWeather";
import FavoritesList from "./components/FavoritesList";
import Search from "./components/Search";
import { City } from "./entities/City";
import { Location } from "./entities/Location";
import { Weather } from "./entities/Weather";
import { usePosition } from "./hooks/usePosition";
import { useStoreActions, useStoreState } from "./store";

function App() {
  const { coords, error: posError } = usePosition();
  const largestCities = useStoreState((state) => state.largestCities.data);
  const setLargestCities = useStoreActions(
    (actions) => actions.largestCities.set
  );
  const favorites = useStoreState((state) => state.favorites.data);
  const userCity = useStoreState((state) => state.userCity.data);
  const setCurrentLocation = useStoreActions((actions) => actions.userCity.set);
  const selectedCity = useStoreState((state) => state.selectedCity.data);
  const selectedNotes = useStoreState((state) => state.selectedNotes);

  useEffect(() => {
    const fetchData = async () => {
      setLargestCities(await getLargestCities());
    };

    fetchData();
  }, [setLargestCities]);

  useEffect(() => {
    const fetchData = async () => {
      if (!coords) return;
      const weatherResp = await getWeather(coords);
      const locationResponse = await getAddress(coords);

      const weather = Weather.fromWeatherResponse(weatherResp.data);
      const location = Location.fromLocationResponse(locationResponse.data);
      const city = new City(location, weather);
      setCurrentLocation(city);
    };

    if (coords) {
      fetchData();
    }
  }, [coords, setCurrentLocation]);

  return (
    <div className="App">
      <CurrentWeather userCity={userCity} error={posError} />
      <Search />
      <FavoritesList favorites={favorites} />
      <CityList cities={largestCities} />

      <CityDetails
        selectedCity={selectedCity}
        favorites={favorites}
        notes={selectedNotes}
      />
    </div>
  );
}

export default App;
