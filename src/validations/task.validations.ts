import z from "zod";

export const createTaskValidationSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional()
})

export const changeTaskStatusValidationSchema = z.object({
    completed: z.boolean()
})