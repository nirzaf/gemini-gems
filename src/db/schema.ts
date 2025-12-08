import { pgTable, serial, varchar, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// Gems content table - stores the actual gem markdown content
export const gems = pgTable('gems', {
    id: serial('id').primaryKey(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    title: varchar('title', { length: 500 }).notNull(),
    description: text('description').notNull(),
    category: varchar('category', { length: 100 }).notNull(),
    icon: varchar('icon', { length: 100 }).notNull(),
    color: varchar('color', { length: 50 }).notNull(),
    features: text('features').notNull(), // JSON string array
    content: text('content').notNull(), // Full markdown content
    lastUpdated: timestamp('last_updated').defaultNow(),
    createdAt: timestamp('created_at').defaultNow(),
});

// Gem statistics table
export const gemsStats = pgTable('gems_stats', {
    id: serial('id').primaryKey(),
    gemSlug: varchar('gem_slug', { length: 255 }).notNull().unique(),
    copyCount: integer('copy_count').notNull().default(0),
    viewCount: integer('view_count').notNull().default(0),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Labels table
export const gemLabels = pgTable('gem_labels', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull().unique(),
    color: varchar('color', { length: 50 }).notNull().default('#3B82F6'),
    description: text('description'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Gem-Label mappings table (many-to-many)
export const gemLabelMappings = pgTable('gem_label_mappings', {
    id: serial('id').primaryKey(),
    gemSlug: varchar('gem_slug', { length: 255 }).notNull(),
    labelId: integer('label_id').notNull().references(() => gemLabels.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow(),
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
