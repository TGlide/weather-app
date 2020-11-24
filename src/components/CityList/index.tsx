import React, { useEffect, useState } from "react";
import { CityDatum, getCitiesByPopulation } from "../../api/getCities";
import { sleep } from "../../utils/time";
import CityCard from "./CityCard";
import "./styles.scss";

interface CityListProps {}

const CityList: React.FC<CityListProps> = () => {
  const [largestCities, setLargestCities] = useState<CityDatum[]>([]);

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

      setLargestCities(cities);
    };

    fetchData();
  }, []);

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
        return <CityCard city={city} key={city.id} />;
      })}
    </div>
  );
};

export default CityList;