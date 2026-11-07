type CityParams = {
  city: string;
  apiKey: string;
};

type CoordinatesParams = {
  lon: number;
  lat: number;
  apiKey: string;
}

export const getCityInfo = async ({
  city,
  apiKey,
}: CityParams) => {
  const url = new URL("http://api.openweathermap.org/geo/1.0/direct");

  url.search = new URLSearchParams({
    q: city,
    limit: "5",
    appid: apiKey,
  }).toString();

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch city infomation");
  };

  return response.json();
}

export const getCoordinates = async ({ city, apiKey }: CityParams) => {
  const locations = await getCityInfo({ city, apiKey });

  if (!locations.length) {
    throw new Error("Location not found");
  };

  return {
    lat: locations[0].lat,
    lon: locations[0].lon,
  };
};

export const getCurrentWeather = async ({
  lon,
  lat,
  apiKey,
}: CoordinatesParams) => {
  const url = new URL("https://api.openweathermap.org/data/2.5/weather");

  url.search = new URLSearchParams({
    lat: lat.toString(),
    lon: lon.toString(),
    appid: apiKey,
    units: "metric",
  }).toString();

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch current weather");
  };

  return response.json();
};

export const getForecast = async ({ lat, lon, apiKey }: CoordinatesParams) => {
  const url = new URL("https://api.openweathermap.org/data/2.5/forecast");

  url.search = new URLSearchParams({
    lat: lat.toString(),
    lon: lon.toString(),
    appid: apiKey,
    units: "metric",
  }).toString();

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch forecast infomation");
  };

  return response.json();
};