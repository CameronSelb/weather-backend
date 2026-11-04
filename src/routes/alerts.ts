import { Hono } from "hono"
import type { Bindings } from '../types/bindings.js'


const app = new Hono<{ Bindings: Bindings }>()

app.get('/', async (c) => {

})

export default app