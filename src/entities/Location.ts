import { CityDatum } from "../api/getCities";
import { LocationResponse } from "../api/types/LocationResponse";

export class Location {
  constructor(
    public name: string,
    public longitude: string | number,
    public latitude: string | number,
    public country?: string,
    public city?: string
  ) {}

  static fromLocationResponse(response: LocationResponse) {
    const { city, municipality, country } = response.results?.[0].components;
    const { lat, lng } = response.results?.[0].annotations.DMS;
    const name = `${municipality || city}, ${country}`;
    return new Location(name, lng, lat, country, city || municipality);
  }

  static fromCityDatum(datum: CityDatum) {
    return new Location(
      datum.name,
      datum.longitude,
      datum.latitude,
      datum.country,
      datum.city
    );
  }
}
