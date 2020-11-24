import { fromUnixTime, isToday } from "date-fns";
import React, { useEffect, useRef } from "react";
import { getAddress } from "../../api/getAddress";
import { Daily, getWeather } from "../../api/getWeather";
import { ReactComponent as MapPin } from "../../assets/icons/map-pin.svg";
import { useStoreActions, useStoreState } from "../../store";
import { formatDatetime } from "../../utils/date";
import WeatherIcon from "../WeatherIcon";
import "./styles.scss";

interface CurrentWeatherProps {
  coords?: Coordinates;
  error?: string;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ coords, error }) => {
  const scrollBar = useRef<HTMLDivElement>(null);

  const weatherData = useStoreState((state) => state.location.weather);
  const setWeatherData = useStoreActions((actions) => actions.setWeather);
  const addressData = useStoreState((state) => state.location.address);
  const setAddressData = useStoreActions((actions) => actions.setAddress);

  // useEffect(() => {
  //   if (!scrollBar.current || scrollBar.current.scrollWidth === 0) return;

  //   scrollBar.current.scrollLeft =
  //     scrollBar.current.scrollWidth / 2 - scrollBar.current.clientWidth / 2;
  // }, [scrollBar, coords, weatherData, addressData]);

  useEffect(() => {
    const fetchData = async () => {
      if (!coords) return;
      getWeather(coords).then((res) => {
        setWeatherData(res.data);
      });

      getAddress(coords).then((res) => {
        setAddressData(res.data);
      });
    };

    if (coords) {
      fetchData();
    }
  }, [coords, setWeatherData, setAddressData]);

  const renderDay = (date: Daily) => {
    return (
      <div className="day" key={date.dt}>
        <WeatherIcon
          iconCode={date.weather[0].icon || "09d"}
          className={`icon`}
        />
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

  const { city, municipality, country } = addressData.results?.[0].components;

  return (
    <div className="current-weather">
      <div className="location">
        <MapPin />
        <span>
          {municipality || city}, {country}
        </span>
      </div>

      {/* <span className={`time`}>20:30</span> */}

      <WeatherIcon
        iconCode={weatherData.current.weather[0].icon}
        className={`weather-icon`}
      />
      <span className="main-temp">{Math.round(weatherData.current.temp)}°</span>

      <div className="days-container">
        <div className="days" ref={scrollBar}>
          {weatherData.daily.map((date) => renderDay(date))}
        </div>
        <div className="opacity-overlay"></div>
      </div>

      <button className={`details`}>More details</button>
    </div>
  );
};

export default CurrentWeather;
