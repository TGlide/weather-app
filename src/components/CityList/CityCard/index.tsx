import React, { useEffect, useState } from "react";
import { getWeather, WeatherResponse } from "../../../api/getWeather";
import { ReactComponent as X } from "../../../assets/icons/x.svg";
import { Location } from "../../../entities/Location";
import { useStoreActions } from "../../../store";
import WeatherIcon from "../../WeatherIcon";
import "./styles.scss";

interface CityCardProps {
  city: Location;
}

const CityCard: React.FC<CityCardProps> = ({ city }) => {
  const [weatherInfo, setWeatherInfo] = useState<WeatherResponse | undefined>(
    undefined
  );
  const [hidden, setHidden] = useState(false);
  const setSelectedAddress = useStoreActions(
    (actions) => actions.selectedCity.setAddress
  );
  const setSelectedWeather = useStoreActions(
    (actions) => actions.selectedCity.setWeather
  );

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

  const handleClick = () => {
    setSelectedAddress(city);
    if (weatherInfo) setSelectedWeather(weatherInfo);
  };

  return (
    <div className={`city-card`} onClick={handleClick}>
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
      <button
        onClick={(e) => {
          e.stopPropagation();
          setHidden(true);
        }}
      >
        <X style={{ color: "white", fill: "currentcolor" }} />
      </button>
    </div>
  );
};

export default CityCard;
