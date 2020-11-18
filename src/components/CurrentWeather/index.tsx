import React, { useEffect, useRef } from "react";
import "./styles.scss";
import { ReactComponent as Rain } from "../../assets/icons/rain.svg";
import { ReactComponent as Thunder } from "../../assets/icons/thunder.svg";
import { ReactComponent as MapPin } from "../../assets/icons/map-pin.svg";

interface CurrentWeatherProps {}

const CurrentWeather: React.FC<CurrentWeatherProps> = () => {
  const scrollBar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollBar === null || scrollBar.current === null) return;

    scrollBar.current.scrollLeft =
      scrollBar.current.scrollWidth / 2 - scrollBar.current.clientWidth / 2;
  }, [scrollBar]);

  const renderDay = (date: string) => {
    return (
      <div className="day" key={date}>
        <Rain className={`icon`} />
        <span className="temp">21°</span>
        <span className={`date`}>{date}</span>
      </div>
    );
  };

  return (
    <div className="current-weather">
      <div className="location">
        <MapPin />
        <span>Oeiras, Portugal</span>
      </div>

      <span className={`time`}>20:30</span>

      <Rain className={`weather-icon`} />
      <span className="main-temp">21°</span>

      <div className="days-container">
        <div className="days" ref={scrollBar}>
          {["Fri", "Sat", "Sun", "Today", "Tue", "Wed", "Thu"].map((date) =>
            renderDay(date)
          )}
        </div>
        <div className="opacity-overlay"></div>
      </div>

      <button className={`details`}>More details</button>
    </div>
  );
};

export default CurrentWeather;
