import React, { useEffect, useState } from "react";
import { CityDatum } from "../../../api/getCities";
import { getWeather, WeatherResponse } from "../../../api/getWeather";
import WeatherIcon from "../../WeatherIcon";
import { ReactComponent as X } from "../../../assets/icons/x.svg";

import "./styles.scss";

interface CityCardProps {
  city: CityDatum;
}

const CityCard: React.FC<CityCardProps> = ({ city }) => {
  const [weatherInfo, setWeatherInfo] = useState<WeatherResponse | undefined>(
    undefined
  );
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const coords = {
        latitude: city.latitude,
        longitude: city.longitude,
      };

      const resp = await getWeather(coords);
      setWeatherInfo(resp.data);
    };

    fetchData();
  }, [city.latitude, city.longitude]);

  if (hidden) return null;

  return (
    <div className={`city-card`}>
      <div className="weather-info">
        {weatherInfo && (
          <>
            <WeatherIcon
              iconCode={weatherInfo.current.weather[0].icon}
              className={`icon`}
            />
            <span className={`temperature`}>
              {Math.round(weatherInfo.current.temp)}°
            </span>
          </>
        )}
      </div>
      <div className="city-info">
        <span className={`city-name`}>{city.name}</span>
        <span className={`country-name`}>{city.country}</span>
      </div>
      <button onClick={() => setHidden(true)}>
        <X style={{ color: "white", fill: "currentcolor" }} />
      </button>
    </div>
  );
};

export default CityCard;
