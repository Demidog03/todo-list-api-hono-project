import { relations } from 'drizzle-orm';
import { TasksTable } from './schema.ts';

export const tasksRelations = relations(TasksTable, () => ({
    // define relations here when needed
}))