import { Hono } from 'hono'
import type { Bindings } from 'hono/types'

import weather from './routes/weather.js'
import forecast from './routes/forecast.js'
import airQuality from './routes/air-quality.js'
import alerts from './routes/alerts.js'
import locations from './routes/locations.js'

const app = new Hono<{ Bindings: Bindings }>()

app.get('/', (c) => {
  return c.json('Weather Backend')
})

app.route('/weather', weather)
app.route('/forecast', forecast)
app.route('/air-quality', airQuality)
app.route('/alerts', alerts)
app.route('/locations', locations)

export default app
