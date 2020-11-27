import { Location } from "./Location";
import { Weather } from "./Weather";

export class City {
  constructor(public location: Location, public weather?: Weather) {}
}
