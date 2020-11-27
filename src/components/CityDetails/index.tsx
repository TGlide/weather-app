import { fromUnixTime, isToday } from "date-fns";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getWeather } from "../../api/getWeather";
import { ReactComponent as Star } from "../../assets/icons/star.svg";
import { ReactComponent as X } from "../../assets/icons/x.svg";
import { City } from "../../entities/City";
import { Location } from "../../entities/Location";
import { DailyData, Weather } from "../../entities/Weather";
import useComponentVisible from "../../hooks/useComponentVisible";
import { useStoreActions } from "../../store";
import "../../styles/layout.scss";
import { formatDatetime } from "../../utils/date";
import WeatherIcon from "../WeatherIcon";
import Note from "./Note";
import "./styles.scss";

interface CityDetailsProps {
  selectedCity?: City;
  notes: string[];
  favorites: { [key: string]: City };
}

const CityDetails: React.FC<CityDetailsProps> = ({
  selectedCity,
  notes,
  favorites,
}) => {
  const clearSelectedCity = useStoreActions(
    (actions) => actions.selectedCity.clear
  );
  const setSelectedCity = useStoreActions(
    (actions) => actions.selectedCity.set
  );
  const addNote = useStoreActions((actions) => actions.notes.add);
  const toggleFavorite = useStoreActions((actions) => actions.favorites.toggle);

  const handleClose = useCallback(() => {
    clearSelectedCity();
  }, [clearSelectedCity]);

  const { ref } = useComponentVisible(false, handleClose);

  const [noteInput, setNoteInput] = useState("");

  const isFavorite = useMemo(() => {
    if (!selectedCity) return false;

    const key = Location.getKey(selectedCity.location);
    return Object.keys(favorites).includes(key);
  }, [favorites, selectedCity]);

  const renderDay = (day: DailyData) => {
    if (isToday(fromUnixTime(day.dt))) return null;
    return (
      <div className="day" key={day.dt}>
        <WeatherIcon iconCode={day.icon} />
        <span className="temp">{Math.round(day.temp.day)}°</span>
        <span className={`date`}>{formatDatetime(day.dt)}</span>
      </div>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedCity) return;
      const resp = await getWeather({
        latitude: selectedCity.location.latitude,
        longitude: selectedCity.location.longitude,
      });
      const newCity = new City(
        selectedCity.location,
        Weather.fromWeatherResponse(resp.data)
      );
      setSelectedCity(newCity);
    };

    if (!selectedCity) return;
    if (!selectedCity.weather) fetchData();
  }, [selectedCity, setSelectedCity]);

  if (selectedCity === undefined) return null;

  return (
    <div className={`city-details`}>
      <div className="container">
        <div className="modal" ref={ref}>
          <div className="header">
            <h1 data-testid="name">{selectedCity.location.name}</h1>
            <button
              className={`star ${isFavorite && "filled"}`}
              onClick={() => {
                toggleFavorite(selectedCity);
              }}
              data-testid="star"
            >
              <Star className={`${isFavorite && "filled"}`} />
            </button>
            <button
              className={`close`}
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
                  iconCode={selectedCity.weather.current.icon}
                  className={`icon`}
                />
                <div className={`details`}>
                  <div className="temperature" data-testid="temp">
                    {Math.round(selectedCity.weather.current.temp)}°
                  </div>
                  <div className="feels" data-testid="feels">
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
          <div className="notes">
            <h2>Notes</h2>
            <textarea
              placeholder="Write a note..."
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
            />
            <button
              className={`create-note`}
              onClick={() => {
                if (selectedCity.location)
                  addNote({ location: selectedCity.location, note: noteInput });
              }}
            >
              Create note
            </button>
            <div className="note-list" data-testid="note-list">
              {notes?.map((note, idx) => {
                if (!selectedCity.location) return null;
                return (
                  <Note
                    key={idx}
                    index={idx}
                    note={note}
                    location={selectedCity.location}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityDetails;
