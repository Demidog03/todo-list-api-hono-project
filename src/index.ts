import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

// GET
app.get('/', (context) => {
  return context.json({
    message: 'Hello Hono!'
  })
})

// POST
app.post('/test', async (context) => {
  try {
    const body = await context.req.json()
    // имитация создания
    return context.json({
      result: body
    }, 201)
  }
  catch {
    return context.json({
      error: 'Ошибка!'
    }, 400)
  }
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Сервер запущен: http://localhost:${info.port}`)
})
