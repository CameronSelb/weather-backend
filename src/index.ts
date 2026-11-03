import { Hono } from 'hono'

type Bindings = {
  WEATHER_API_KEY: string
}

interface GeoLocation {
  name: string
  lat: number
  lon: number
  country: string
  state: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/', (c) => {
  return c.json('Weather Backend')
})

app.get('/weather', async (c) => {
  const apiKey = c.env.WEATHER_API_KEY
  const city = c.req.query("city") ?? "Cape Town"
  
  const cityUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`
  const cityResponse = await fetch(cityUrl)
  const cityData = ((await cityResponse.json()) as GeoLocation[])

  const lat = cityData[0].lat
  const lon = cityData[0].lon

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
  const response = await fetch(url)
  const data = await response.json()
  
  return c.json(data)
})

export default app
