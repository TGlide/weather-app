import { fromUnixTime, isToday } from "date-fns";
import React, { useEffect } from "react";
import { getAddress } from "../../api/getAddress";
import { getWeather } from "../../api/getWeather";
import { ReactComponent as MapPin } from "../../assets/icons/map-pin.svg";
import { City } from "../../entities/City";
import { Location } from "../../entities/Location";
import { DailyData, Weather } from "../../entities/Weather";
import { useStoreActions, useStoreState } from "../../store";
import { formatDatetime } from "../../utils/date";
import WeatherIcon from "../WeatherIcon";
import "./styles.scss";

interface CurrentWeatherProps {
  coords?: Coordinates;
  error?: string;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ coords, error }) => {
  const userCity = useStoreState((state) => state.userCity.data);
  const setCurrentLocation = useStoreActions((actions) => actions.userCity.set);
  const setSelectedCity = useStoreActions(
    (actions) => actions.selectedCity.set
  );

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

  const renderDay = (date: DailyData) => {
    return (
      <div className="day" key={date.dt}>
        <WeatherIcon iconCode={date.icon} className={`icon`} />
        <span className="temp">{Math.round(date.temp.day)}°</span>
        <span className={`date`}>
          {isToday(fromUnixTime(date.dt)) ? "Today" : formatDatetime(date.dt)}
        </span>
      </div>
    );
  };

  if (error) {
    return <div className={`pos-error`}>We couldn't get your location.</div>;
  }

  if (!userCity || !userCity.weather) {
    return <div className={`pos-loading`}>Getting your location...</div>;
  }

  return (
    <div className="current-weather">
      <div className="location">
        <MapPin />
        <span>{userCity.location.name}</span>
      </div>

      <WeatherIcon
        iconCode={userCity.weather.current.icon}
        className={`weather-icon`}
      />
      <span className="main-temp">
        {Math.round(userCity.weather.current.temp)}°
      </span>

      <div className="days-container">
        <div className="days">
          {userCity.weather.daily.map((date) => renderDay(date))}
        </div>
        <div className="opacity-overlay"></div>
      </div>

      <button className={`details`} onClick={() => setSelectedCity(userCity)}>
        More details
      </button>
    </div>
  );
};

export default CurrentWeather;
