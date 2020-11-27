import React, { useEffect, useMemo, useState } from "react";
import { getWeather, WeatherResponse } from "../../api/getWeather";
import { ReactComponent as X } from "../../assets/icons/x.svg";
import { ReactComponent as Star } from "../../assets/icons/star.svg";
import { Location } from "../../entities/Location";
import { useStoreActions, useStoreState } from "../../store";
import WeatherIcon from "../WeatherIcon";
import "./styles.scss";

interface CityCardProps {
  city: Location;
  removeable?: boolean;
}

const CityCard: React.FC<CityCardProps> = ({ city, removeable }) => {
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
  const favorites = useStoreState((state) => state.favorites.data);
  const toggleFavorite = useStoreActions((actions) => actions.favorites.toggle);

  const isFavorite = useMemo(() => {
    const key = Location.getKey(city);
    return Object.keys(favorites).includes(key);
  }, [city, favorites]);

  const handleClick = () => {
    setSelectedAddress(city);
    if (weatherInfo) setSelectedWeather(weatherInfo);
  };

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
        className={`star`}
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(city);
        }}
      >
        <Star className={`${isFavorite && "filled"}`} />
      </button>
      {removeable && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setHidden(true);
          }}
          className={`close`}
        >
          <X />
        </button>
      )}
    </div>
  );
};

export default CityCard;
