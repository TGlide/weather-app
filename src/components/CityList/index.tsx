import React from "react";
import { City } from "../../entities/City";
import { Location } from "../../entities/Location";
import CityCard from "../CityCard";
import "./styles.scss";

interface CityListProps {
  cities: City[];
}

const CityList: React.FC<CityListProps> = ({ cities }) => {
  if (!cities.length) {
    return (
      <div className={`container`} style={{ textAlign: "center" }}>
        <span>Loading cities...</span>
      </div>
    );
  }

  return (
    <div className={`container city-list`}>
      <h1>Largest Cities</h1>
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
  );
};

export default CityList;
