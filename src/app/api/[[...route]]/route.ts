import { Hono } from 'hono'
import { handle } from 'hono/vercel'

import expensesApp from "./expenses"


export const runtime = 'edge'

const app = new Hono().basePath('/api')
    .route("/expenses", expensesApp)

export const GET = handle(app)
export const POST = handle(app)

export type AppType = typeof app