import { Hono } from "hono"
import { getCityInfo, getCurrentWeather } from '../services/openweather.js'
import type { GeoLocation } from "../types/weather.js"
import type { Bindings } from '../types/bindings.js'
import { DEFAULT_CITY } from "../constants/index.js"


const app = new Hono<{ Bindings: Bindings }>()

app.get('/', async (c) => {
  const apiKey = c.env.WEATHER_API_KEY
  const city = c.req.query("city") ?? DEFAULT_CITY
  
  const cityResponse = await getCityInfo({city: city, apiKey: apiKey})
  const cityData = ((await cityResponse) as GeoLocation[])

  const lat = cityData[0].lat
  const lon = cityData[0].lon
  
  const data = await getCurrentWeather({lon: lon, lat: lat, apiKey: apiKey})
  
  return c.json(data)
})

export default app