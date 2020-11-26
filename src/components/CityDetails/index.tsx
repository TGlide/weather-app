import { fromUnixTime, isToday } from "date-fns";
import React, { useCallback, useEffect, useState } from "react";
import { Daily, getWeather } from "../../api/getWeather";
import { ReactComponent as X } from "../../assets/icons/x.svg";
import { Location } from "../../entities/Location";
import useComponentVisible from "../../hooks/useComponentVisible";
import { useStoreActions, useStoreState } from "../../store";
import "../../styles/layout.scss";
import { formatDatetime } from "../../utils/date";
import WeatherIcon from "../WeatherIcon";
import "./styles.scss";

interface CityDetailsProps {}

const CityDetails: React.FC<CityDetailsProps> = () => {
  const clearSelectedCity = useStoreActions(
    (actions) => actions.selectedCity.clear
  );
  const setSelectedWeather = useStoreActions(
    (actions) => actions.selectedCity.setWeather
  );
  const selectedCity = useStoreState((state) => state.selectedCity.data);
  const notes = useStoreState((state) => state.selectedNotes);
  const addNote = useStoreActions((actions) => actions.notes.add);
  const deleteNote = useStoreActions((actions) => actions.notes.delete);

  const handleClose = useCallback(() => {
    clearSelectedCity();
  }, [clearSelectedCity]);

  const { ref } = useComponentVisible(false, handleClose);

  const [noteInput, setNoteInput] = useState("");

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

  if (!selectedCity.address) return null;

  return (
    <div className={`city-details`}>
      <div className="container">
        <div className="modal" ref={ref}>
          <div className="header">
            <h1>
              {selectedCity.address.name}{" "}
              {Location.getKey(selectedCity.address)}
            </h1>

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
                if (selectedCity.address)
                  addNote({ location: selectedCity.address, note: noteInput });
              }}
            >
              Create note
            </button>
            <div className="note-list">
              {notes?.map((note, idx) => (
                <div key={idx}>
                  <span>{note}</span>{" "}
                  <button
                    onClick={() => {
                      if (selectedCity.address)
                        deleteNote({
                          location: selectedCity.address,
                          index: idx,
                        });
                    }}
                  >
                    <X />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityDetails;
