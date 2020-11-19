import { useState, useEffect } from "react";

export const usePosition = () => {
  const [coords, setCoords] = useState<Coordinates | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const onError = (error: PositionError) => {
    setError(error.message);
  };

  useEffect(() => {
    const onChange = ({ coords: newCoords }: Position) => {
      if (!coords) setCoords(newCoords);
    };

    const geo = navigator.geolocation;
    if (!geo) {
      setError("Geolocation is not supported");
      return;
    }
    const watcher = geo.watchPosition(onChange, onError);

    return () => geo.clearWatch(watcher);
  }, [coords]);

  return { coords, error };
};
