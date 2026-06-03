// Схема таблицы Tasks

import { pgTable, text, uuid, boolean, timestamp } from "drizzle-orm/pg-core";

export const TasksTable = pgTable('tasks', {
    id: uuid().primaryKey().defaultRandom(),
    title: text().notNull(),
    description: text(),
    completed: boolean().notNull().default(false),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
})