import { useState, useEffect } from "react";

export const usePosition = () => {
  const [coords, setCoords] = useState<Coordinates | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const onChange = ({ coords }: Position) => {
    setCoords(coords);
  };

  const onError = (error: PositionError) => {
    setError(error.message);
  };

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError("Geolocation is not supported");
      return;
    }
    const watcher = geo.watchPosition(onChange, onError);
    return () => geo.clearWatch(watcher);
  }, []);

  return { coords, error };
};
