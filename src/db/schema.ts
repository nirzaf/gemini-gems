import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// Gems content table - stores the actual gem markdown content
export const gems = sqliteTable('gems', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    slug: text('slug').notNull().unique(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    category: text('category').notNull(),
    icon: text('icon').notNull(),
    color: text('color').notNull(),
    features: text('features').notNull(), // JSON string array
    content: text('content').notNull(), // Full markdown content
    lastUpdated: text('last_updated').default(sql`CURRENT_TIMESTAMP`),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// Gem statistics table
export const gemsStats = sqliteTable('gems_stats', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    gemSlug: text('gem_slug').notNull().unique(),
    copyCount: integer('copy_count').notNull().default(0),
    viewCount: integer('view_count').notNull().default(0),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Labels table
export const gemLabels = sqliteTable('gem_labels', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull().unique(),
    color: text('color').notNull().default('#3B82F6'),
    description: text('description'),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Gem-Label mappings table (many-to-many)
export const gemLabelMappings = sqliteTable('gem_label_mappings', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    gemSlug: text('gem_slug').notNull(),
    labelId: integer('label_id').notNull().references(() => gemLabels.id, { onDelete: 'cascade' }),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// Type exports for TypeScript
export type Gem = typeof gems.$inferSelect;
export type NewGem = typeof gems.$inferInsert;

export type GemStat = typeof gemsStats.$inferSelect;
export type NewGemStat = typeof gemsStats.$inferInsert;

export type GemLabel = typeof gemLabels.$inferSelect;
export type NewGemLabel = typeof gemLabels.$inferInsert;

export type GemLabelMapping = typeof gemLabelMappings.$inferSelect;
export type NewGemLabelMapping = typeof gemLabelMappings.$inferInsert;
