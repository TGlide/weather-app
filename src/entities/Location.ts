import { CityDatum } from "../api/getCities";
import { LocationResponse, Result } from "../api/types/LocationResponse";

export class Location {
  constructor(
    public name: string,
    public longitude: string | number,
    public latitude: string | number,
    public country?: string,
    public city?: string
  ) {}

  static fromLocationResponse(response: LocationResponse) {
    return this.fromLocationResult(response.results?.[0]);
  }

  static fromLocationResult(result: Result) {
    const { city, municipality, country, state } = result.components;
    const { lat, lng } = result.geometry;
    let name = "";
    if (!(municipality || city)) name = result?.formatted || country;
    else name = `${municipality || city || state}, ${country}`;
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
