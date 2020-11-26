import React from "react";
import { useStoreActions, useStoreState } from "../../store";
import "./styles.scss";

interface CityDetailsProps {}

const CityDetails: React.FC<CityDetailsProps> = () => {
  const clearSelectedCity = useStoreActions(
    (actions) => actions.clearSelectedCity
  );
  const selectedCity = useStoreState((state) => state.selectedCity);

  if (!selectedCity.address) return null;

  return (
    <div className={`city-details`} onClick={() => clearSelectedCity()}>
      <div className="modal">
        {selectedCity.address && selectedCity.address.name}
      </div>
    </div>
  );
};

export default CityDetails;
