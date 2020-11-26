import React, { useCallback, useEffect } from "react";
import { Daily, getWeather } from "../../api/getWeather";
import { useStoreActions, useStoreState } from "../../store";
import WeatherIcon from "../WeatherIcon";
import { ReactComponent as X } from "../../assets/icons/x.svg";
import "./styles.scss";
import { fromUnixTime, isToday } from "date-fns";
import { formatDatetime } from "../../utils/date";

interface CityDetailsProps {}

const CityDetails: React.FC<CityDetailsProps> = () => {
  const clearSelectedCity = useStoreActions(
    (actions) => actions.clearSelectedCity
  );
  const setSelectedWeather = useStoreActions(
    (actions) => actions.setSelectedWeather
  );
  const selectedCity = useStoreState((state) => state.selectedCity);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedCity.address) return;
      const resp = await getWeather({
        latitude: selectedCity.address.latitude,
        longitude: selectedCity.address.longitude,
      });
      setSelectedWeather(resp.data);
    };

    if (!selectedCity.address) return;
    if (!selectedCity.weather) fetchData();
  }, [selectedCity.address, selectedCity.weather, setSelectedWeather]);

  const handleClose = useCallback(() => {
    console.log("sc", selectedCity);
    console.log("clear", clearSelectedCity);

    clearSelectedCity();
  }, [clearSelectedCity, selectedCity]);

  if (!selectedCity.address) return null;

  const renderDay = (day: Daily) => {
    if (isToday(fromUnixTime(day.dt))) return null;
    return (
      <div className="day" key={day.dt}>
        <WeatherIcon iconCode={day.weather[0].icon} />
        <span className="temp">{Math.round(day.temp.day)}°</span>
        <span className={`date`}>{formatDatetime(day.dt)}</span>
      </div>
    );
  };

  return (
    <div className={`city-details`} onClick={handleClose}>
      <div className="container">
        <div className="modal">
          <div className="header">
            <h1>{selectedCity.address.name}</h1>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
            >
              <X />
            </button>
          </div>
          {selectedCity.weather ? (
            <>
              <div className={`weather-info`}>
                <WeatherIcon
                  iconCode={selectedCity.weather.current.weather[0].icon}
                  className={`icon`}
                />
                <div className={`details`}>
                  <div className="temperature">
                    {Math.round(selectedCity.weather.current.temp)}°
                  </div>
                  <div className="feels">
                    Feels like{" "}
                    {Math.round(selectedCity.weather.current.feels_like)}°
                  </div>
                </div>
              </div>

              <div className="daily-weather">
                {selectedCity.weather.daily.map((day) => renderDay(day))}
              </div>
            </>
          ) : (
            <div className={`loading`}>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CityDetails;
