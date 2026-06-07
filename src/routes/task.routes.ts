import { Hono } from "hono";
import { db } from "../db/db.ts";
import { desc, eq } from "drizzle-orm";
import { TasksTable } from "../db/schema.ts";
import { sValidator } from "@hono/standard-validator";
import { changeTaskStatusValidationSchema, createTaskValidationSchema } from "../validations/task.validations.ts";

export const taskRoutes = new Hono()

// /tasks => task routes
taskRoutes.get('/', async (context) => { // "/" => "/tasks/"
    const tasks = await db.query.TasksTable.findMany({ orderBy: desc(TasksTable.updatedAt) }) // SELECT * FROM 'tasks' ORDER BY updated_at DESC
    return context.json({
        data: tasks,
    })
})

taskRoutes.get('/:id', async (context) => { // "/:id" => "/tasks/:id"
    try {
        const id = context.req.param('id')
        // eq = equal, tasksTable.id === id
        const task = await db.query.TasksTable.findFirst({ where: eq(TasksTable.id, id) }) // SELECT * FROM 'tasks' WHERE id = 'fdsfsdfsdgdgcxvxc

        return context.json({
            data: task
        })
    }
    catch (error) {
        if (error?.cause?.code === '22P02') {
            return context.json({
                error: "Задача не найдена"
            }, 404) //404 = Not Found
        }

        return context.json({
            error: 'Ошибка сервера'
        }, 500)
    }
})

taskRoutes.post('/', sValidator('json', createTaskValidationSchema), async (context) => { // "/" => "/tasks/"
    const body = context.req.valid('json')
    await db.insert(TasksTable).values(body)

    return context.json({
        message: 'Задача успешна создана'
    }, 201)
})

taskRoutes.patch('/:id/status', sValidator('json', changeTaskStatusValidationSchema), async (context) => { // "/" => "/tasks/"
    try {
        const id = context.req.param('id')
        const body = context.req.valid('json')
        await db.update(TasksTable).set(body).where(eq(TasksTable.id, id))

        return context.json({
            message: 'Статус задачи обновлен'
        })
    }
    catch (error) {
        if (error?.cause?.code === '22P02') {
            return context.json({
                error: "Задача не найдена"
            }, 404) //404 = Not Found
        }

        return context.json({
            error: 'Ошибка сервера'
        }, 500)
    }
})

taskRoutes.delete('/:id', async (context) => { // "/" => "/tasks/"
    try {
        const id = context.req.param('id')
        await db.delete(TasksTable).where(eq(TasksTable.id, id))

        return context.json({
            message: 'Задача была удалена'
        })
    }
    catch (error) {
        if (error?.cause?.code === '22P02') {
            return context.json({
                error: "Задача не найдена"
            }, 404) //404 = Not Found
        }

         return context.json({
            error: 'Ошибка сервера'
        }, 500)
    }
})