import React, { useEffect, useRef } from "react";
import "./styles.scss";
import { ReactComponent as Rain } from "../../assets/icons/rain.svg";
// import { ReactComponent as Thunder } from "../../assets/icons/thunder.svg";
import { ReactComponent as MapPin } from "../../assets/icons/map-pin.svg";

interface CurrentWeatherProps {
  coords?: Coordinates;
  error?: string;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ coords, error }) => {
  const scrollBar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollBar.current || scrollBar.current.scrollWidth === 0) return;

    scrollBar.current.scrollLeft =
      scrollBar.current.scrollWidth / 2 - scrollBar.current.clientWidth / 2;
  }, [scrollBar, coords]);

  const renderDay = (date: string) => {
    return (
      <div className="day" key={date}>
        <Rain className={`icon`} />
        <span className="temp">21°</span>
        <span className={`date`}>{date}</span>
      </div>
    );
  };

  if (error) {
    return <div className={`pos-error`}>We couldn't get your location.</div>;
  }

  if (!coords) {
    return <div className={`pos-loading`}>Getting your location...</div>;
  }

  return (
    <div className="current-weather">
      <div className="location">
        <MapPin />
        <span>Oeiras, Portugal</span>
        <span>{coords.latitude}</span>
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
