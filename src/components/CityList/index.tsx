import React, { useEffect } from "react";
import { CityDatum, getCitiesByPopulation } from "../../api/getCities";
import { Location } from "../../entities/Location";
import { useStoreActions, useStoreState } from "../../store";
import { sleep } from "../../utils/time";
import CityCard from "./CityCard";
import "./styles.scss";

interface CityListProps {}

const CityList: React.FC<CityListProps> = () => {
  const largestCities = useStoreState((state) => state.largestCities.data);
  const setLargestCities = useStoreActions(
    (actions) => actions.largestCities.set
  );

  useEffect(() => {
    const fetchData = async () => {
      const cities: CityDatum[] = [];

      for (let offset = 0; offset <= 10; offset += 5) {
        const response = await getCitiesByPopulation(offset);
        cities.push(...response.data.data);
        await sleep(2000);
      }

      cities.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

      setLargestCities(cities.map((city) => Location.fromCityDatum(city)));
    };

    fetchData();
  }, [setLargestCities]);

  if (!largestCities.length) {
    return (
      <div className={`container`} style={{ textAlign: "center" }}>
        <span>Loading cities...</span>
      </div>
    );
  }

  return (
    <div className={`container city-list`}>
      {largestCities.map((city) => {
        return <CityCard city={city} key={city.name} />;
      })}
    </div>
  );
};

export default CityList;
