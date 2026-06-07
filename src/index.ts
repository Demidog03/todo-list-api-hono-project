import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { taskRoutes } from './routes/task.routes.ts'

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

app.route('/tasks', taskRoutes) // ко всем роутам в файле task.routes.ts в начале добавь слово /tasks

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Сервер запущен: http://localhost:${info.port}`)
})
