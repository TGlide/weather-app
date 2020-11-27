import React, { useEffect } from "react";
import { CityDatum, getCitiesByPopulation } from "../../api/getCities";
import { getWeather } from "../../api/getWeather";
import { City } from "../../entities/City";
import { Location } from "../../entities/Location";
import { Weather } from "../../entities/Weather";
import { useStoreActions, useStoreState } from "../../store";
import { sleep } from "../../utils/time";
import CityCard from "../CityCard";
import "./styles.scss";

interface CityListProps {}

const CityList: React.FC<CityListProps> = () => {
  const largestCities = useStoreState((state) => state.largestCities.data);
  const setLargestCities = useStoreActions(
    (actions) => actions.largestCities.set
  );

  useEffect(() => {
    const fetchData = async () => {
      const cities: City[] = [];
      const cityDatums: CityDatum[] = [];

      for (let offset = 0; offset <= 10; offset += 5) {
        const response = await getCitiesByPopulation(offset);
        cityDatums.push(...response.data.data);
        await sleep(2000);
      }

      cityDatums.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

      for (const cityDatum of cityDatums) {
        const weatherResp = await getWeather({
          latitude: cityDatum.latitude,
          longitude: cityDatum.longitude,
        });
        const city = new City(
          Location.fromCityDatum(cityDatum),
          Weather.fromWeatherResponse(weatherResp.data)
        );
        cities.push(city);
      }

      setLargestCities(cities);
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
      <h1>Largest Cities</h1>
      {largestCities.map((city) => {
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
