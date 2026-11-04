type WeatherParams = {
  city?: string;
  lon?: number;
  lat?: number;
  apiKey: string;
};

export const getCityInfo = async ({
city,
apiKey,
}: WeatherParams) => {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`);

    if (!response.ok) {
        throw new Error("Failed to fetch city infomation");
    }

    return response.json();
}

export const getCurrentWeather = async ({
  lon,
  lat,
  apiKey,
}: WeatherParams) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);

  if (!response.ok) {
    throw new Error("Failed to fetch current weather");
  }

  return response.json();
};