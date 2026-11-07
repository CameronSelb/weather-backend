import { Hono } from "hono"
import { getCoordinates, getCurrentWeather } from '../services/openweather.js'
import type { Bindings } from '../types/bindings.js'
import { DEFAULT_CITY } from "../constants/index.js"


const app = new Hono<{ Bindings: Bindings }>()

app.get('/', async (c) => {
  const apiKey = c.env.WEATHER_API_KEY
  const city = c.req.query("city") ?? DEFAULT_CITY
  
  const {lat, lon} = await getCoordinates({city: city, apiKey: apiKey})
  
  const data = await getCurrentWeather({lon: lon, lat: lat, apiKey: apiKey})
  
  return c.json(data)
})

export default app