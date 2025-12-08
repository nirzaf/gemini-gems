import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// Turso schema (SQLite) - for migration purposes only
export const gemsStats = sqliteTable('gems_stats', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    gemSlug: text('gem_slug').notNull().unique(),
    copyCount: integer('copy_count').notNull().default(0),
    viewCount: integer('view_count').notNull().default(0),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});
