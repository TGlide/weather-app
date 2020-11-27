import { CityDatum } from "../api/getCities";
import { LocationResponse, Result } from "../api/types/LocationResponse";
import { roundTo1Decimal } from "../utils/math";

export class Location {
  constructor(
    public name: string,
    public longitude: number,
    public latitude: number,
    public country?: string,
    public city?: string
  ) {
    this.latitude = roundTo1Decimal(latitude);
    this.longitude = roundTo1Decimal(longitude);
  }

  static fromLocationResponse(response: LocationResponse) {
    return Location.fromLocationResult(response.results?.[0]);
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

  static getKey(location: Location) {
    const key = `${location.latitude},${location.longitude}`;
    return key;
  }
}
