import { fromUnixTime, isToday } from "date-fns";
import React from "react";
import { ReactComponent as MapPin } from "../../assets/icons/map-pin.svg";
import { City } from "../../entities/City";
import { DailyData } from "../../entities/Weather";
import { useStoreActions, useStoreState } from "../../store";
import { formatDatetime } from "../../utils/date";
import WeatherIcon from "../WeatherIcon";
import "./styles.scss";

interface CurrentWeatherProps {
  error?: string;
  userCity?: City;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ error, userCity }) => {
  const setSelectedCity = useStoreActions(
    (actions) => actions.selectedCity.set
  );

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
