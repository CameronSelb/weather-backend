import { Hono } from "hono"
import type { Bindings } from '../types/bindings.js'
import { DEFAULT_CITY } from "../constants/index.js";
import { getCoordinates, getForecast } from "../services/openweather.js";


const app = new Hono<{ Bindings: Bindings }>()

app.get('/', async (c) => {
    try {
        const apiKey = c.env.WEATHER_API_KEY;
        const city = c.req.query("city") ?? DEFAULT_CITY;

        const { lat, lon } = await getCoordinates({ city: city, apiKey: apiKey });

        const data = await getForecast({ lat: lat, lon: lon, apiKey: apiKey });

        return c.json(data)
    } catch (error) {
        console.error("Forecast error:", error);

        return c.json({ error: "Failed to retrieve forecast" }, 500);
    }
})

export default app