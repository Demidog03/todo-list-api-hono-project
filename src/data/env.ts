import 'dotenv/config'
import z from 'zod'

const envSchema = z.object({
    DB_HOST: z.string().min(1),
    DB_PORT: z.coerce.number().int().positive(),
    DB_USER: z.string().min(1),
    DB_PASSWORD: z.string().min(1),
    DB_NAME: z.string().min(1),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
    throw new Error(`Неверные переменные окружения: ${parsed.error.message}`)
}

export const env = parsed.data