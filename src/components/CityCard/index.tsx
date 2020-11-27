import React, { useEffect, useMemo, useState } from "react";
import { getWeather } from "../../api/getWeather";
import { ReactComponent as Star } from "../../assets/icons/star.svg";
import { ReactComponent as X } from "../../assets/icons/x.svg";
import { City } from "../../entities/City";
import { Location } from "../../entities/Location";
import { Weather } from "../../entities/Weather";
import { useStoreActions, useStoreState } from "../../store";
import WeatherIcon from "../WeatherIcon";
import "./styles.scss";

interface CityCardProps {
  city: City;
  removeable?: boolean;
}

const CityCard: React.FC<CityCardProps> = ({ city, removeable }) => {
  const [hidden, setHidden] = useState(false);
  const setSelectedCity = useStoreActions(
    (actions) => actions.selectedCity.set
  );
  const favorites = useStoreState((state) => state.favorites.data);
  const toggleFavorite = useStoreActions((actions) => actions.favorites.toggle);

  const isFavorite = useMemo(() => {
    const key = Location.getKey(city.location);
    return Object.keys(favorites).includes(key);
  }, [city, favorites]);

  const handleClick = () => {
    setSelectedCity(city);
  };

  useEffect(() => {
    const fetchData = async () => {
      const coords = {
        latitude: city.location.latitude,
        longitude: city.location.longitude,
      };

      const resp = await getWeather(coords);
      city.weather = Weather.fromWeatherResponse(resp.data);
    };
    if (!city.weather) fetchData();
  }, [city, city.location.latitude, city.location.longitude, city.weather]);

  if (hidden) return null;

  return (
    <div className={`city-card`} onClick={handleClick}>
      <div className="weather-info">
        {city.weather && (
          <>
            <WeatherIcon
              iconCode={city.weather.current.icon}
              className={`icon`}
            />
            <span className={`temperature`}>
              {Math.round(city.weather.current.temp)}°
            </span>
          </>
        )}
      </div>
      <div className="city-info">
        <span className={`city-name`}>{city.location.name}</span>
        <span className={`country-name`}>{city.location.country}</span>
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
