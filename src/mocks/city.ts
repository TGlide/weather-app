import { City } from "../entities/City";
import { Location } from "../entities/Location";

export const mockCity: City = {
  location: {
    name: "Shanghai",
    longitude: 121.4,
    latitude: 31.1,
    country: "People's Republic of China",
    city: "Shanghai",
  },
  weather: {
    lat: 31.17,
    lon: 121.47,
    current: { icon: "01n", dt: 1606491854, temp: 10.35, feels_like: 4.39 },
    daily: [
      {
        icon: "10d",
        dt: 1606446000,
        feels_like: { day: 9.22, night: 5.4, eve: 7.77, morn: 11.56 },
        temp: {
          day: 12.43,
          min: 10.35,
          max: 14.06,
          night: 10.35,
          eve: 12.11,
          morn: 13.74,
        },
      },
      {
        icon: "04d",
        dt: 1606532400,
        feels_like: { day: 6.63, night: 5.37, eve: 5.88, morn: 5.15 },
        temp: {
          day: 11.39,
          min: 9.36,
          max: 11.72,
          night: 9.36,
          eve: 10.46,
          morn: 10.26,
        },
      },
      {
        icon: "01d",
        dt: 1606618800,
        feels_like: { day: 8.64, night: 6.21, eve: 6.94, morn: 5.01 },
        temp: {
          day: 12.18,
          min: 8.56,
          max: 12.73,
          night: 10.02,
          eve: 11.34,
          morn: 8.56,
        },
      },
      {
        icon: "04d",
        dt: 1606705200,
        feels_like: { day: 7.48, night: 6.88, eve: 7.06, morn: 5.48 },
        temp: {
          day: 11.78,
          min: 9.35,
          max: 12.24,
          night: 11.07,
          eve: 11.53,
          morn: 9.35,
        },
      },
      {
        icon: "10d",
        dt: 1606791600,
        feels_like: { day: 9.7, night: 7.72, eve: 8.34, morn: 6.24 },
        temp: {
          day: 13.53,
          min: 10.3,
          max: 13.53,
          night: 11.51,
          eve: 12.05,
          morn: 10.3,
        },
      },
      {
        icon: "03d",
        dt: 1606878000,
        feels_like: { day: 10.27, night: 7.6, eve: 8.58, morn: 8.18 },
        temp: {
          day: 14.19,
          min: 11.44,
          max: 14.19,
          night: 11.44,
          eve: 12.97,
          morn: 11.48,
        },
      },
      {
        icon: "10d",
        dt: 1606964400,
        feels_like: { day: 8, night: 5.02, eve: 6.84, morn: 7.31 },
        temp: {
          day: 12.39,
          min: 10.03,
          max: 12.39,
          night: 10.03,
          eve: 11.3,
          morn: 11.32,
        },
      },
      {
        icon: "10d",
        dt: 1607050800,
        feels_like: { day: 5.22, night: 3.91, eve: 4.1, morn: 4.12 },
        temp: {
          day: 10.35,
          min: 7.78,
          max: 10.35,
          night: 7.78,
          eve: 9,
          morn: 9.03,
        },
      },
    ],
  },
};

export const mockCityKey = Location.getKey(mockCity.location);
