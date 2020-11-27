import React from "react";
import { City } from "../../entities/City";
import { Location } from "../../entities/Location";
import CityCard from "../CityCard";
import "./styles.scss";

interface CityListProps {
  cities: City[];
}

const CityList: React.FC<CityListProps> = ({ cities }) => {
  return (
    <div className={`container city-list`}>
      <h1>Largest Cities</h1>
      {!cities.length && (
        <span data-testid="loading" className={`loading`}>
          Loading cities...
        </span>
      )}
      <div data-testid="city-list">
        {cities.map((city) => {
          return (
            <CityCard
              city={city}
              key={Location.getKey(city.location)}
              removeable={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CityList;
