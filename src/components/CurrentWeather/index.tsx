import { fromUnixTime, isToday } from "date-fns";
import React, { useEffect } from "react";
import { getAddress } from "../../api/getAddress";
import { Daily, getWeather } from "../../api/getWeather";
import { ReactComponent as MapPin } from "../../assets/icons/map-pin.svg";
import { Location } from "../../entities/Location";
import { useStoreActions, useStoreState } from "../../store";
import { formatDatetime } from "../../utils/date";
import WeatherIcon from "../WeatherIcon";
import "./styles.scss";

interface CurrentWeatherProps {
  coords?: Coordinates;
  error?: string;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ coords, error }) => {
  const weatherData = useStoreState((state) => state.location.data.weather);
  const setWeatherData = useStoreActions(
    (actions) => actions.location.setWeather
  );
  const addressData = useStoreState((state) => state.location.data.address);
  const setAddressData = useStoreActions(
    (actions) => actions.location.setAddress
  );

  const setSelectedCity = useStoreActions(
    (actions) => actions.selectedCity.set
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!coords) return;
      getWeather(coords).then((res) => {
        setWeatherData(res.data);
      });

      getAddress(coords).then((res) => {
        setAddressData(Location.fromLocationResponse(res.data));
      });
    };

    if (coords) {
      fetchData();
    }
  }, [coords, setWeatherData, setAddressData]);

  const renderDay = (date: Daily) => {
    return (
      <div className="day" key={date.dt}>
        <WeatherIcon iconCode={date.weather[0].icon} className={`icon`} />
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

  if (!weatherData || !addressData) {
    return <div className={`pos-loading`}>Getting your location...</div>;
  }

  return (
    <div className="current-weather">
      <div className="location">
        <MapPin />
        <span>{addressData.name}</span>
      </div>

      <WeatherIcon
        iconCode={weatherData.current.weather[0].icon}
        className={`weather-icon`}
      />
      <span className="main-temp">{Math.round(weatherData.current.temp)}°</span>

      <div className="days-container">
        <div className="days">
          {weatherData.daily.map((date) => renderDay(date))}
        </div>
        <div className="opacity-overlay"></div>
      </div>

      <button
        className={`details`}
        onClick={() =>
          setSelectedCity({ address: addressData, weather: weatherData })
        }
      >
        More details
      </button>
    </div>
  );
};

export default CurrentWeather;
