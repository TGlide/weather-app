import React from "react";
import { useStoreState } from "../../store";

interface CityDetailsProps {}

const CityDetails: React.FC<CityDetailsProps> = () => {
  const selectedCity = useStoreState((state) => state.selectedCity);

  return (
    <div className={`city-details`}>
      {selectedCity.address && selectedCity.address.name}
    </div>
  );
};

export default CityDetails;
