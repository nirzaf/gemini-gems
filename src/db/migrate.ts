import { db } from './index';
import { gemsStats, gemLabels, gemLabelMappings } from './schema';
import { sql } from 'drizzle-orm';

async function migrate() {
    console.log('🚀 Starting Drizzle migration...\n');

    try {
        // Create gems_stats table
        await db.run(sql`
      CREATE TABLE IF NOT EXISTS gems_stats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        gem_slug TEXT NOT NULL UNIQUE,
        copy_count INTEGER NOT NULL DEFAULT 0,
        view_count INTEGER NOT NULL DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);
        console.log('✅ Created gems_stats table');

        // Create gem_labels table
        await db.run(sql`
      CREATE TABLE IF NOT EXISTS gem_labels (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        color TEXT NOT NULL DEFAULT '#3B82F6',
        description TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);
        console.log('✅ Created gem_labels table');

        // Create gem_label_mappings table
        await db.run(sql`
      CREATE TABLE IF NOT EXISTS gem_label_mappings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        gem_slug TEXT NOT NULL,
        label_id INTEGER NOT NULL REFERENCES gem_labels(id) ON DELETE CASCADE,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(gem_slug, label_id)
      )
    `);
        console.log('✅ Created gem_label_mappings table');

        // Insert default labels
        console.log('\n📝 Creating default labels...\n');

        const defaultLabels = [
            { name: 'Popular', color: '#FF5733', description: 'Most copied gems' },
            { name: 'New', color: '#10B981', description: 'Recently added gems' },
            { name: 'Featured', color: '#F59E0B', description: 'Featured gems' },
            { name: 'Trending', color: '#8B5CF6', description: 'Trending gems' },
        ];

        for (const label of defaultLabels) {
            try {
                await db.insert(gemLabels).values(label).onConflictDoNothing();
                console.log(`✅ Created label: ${label.name}`);
            } catch (error) {
                console.log(`⚠️  Label "${label.name}" already exists, skipping...`);
            }
        }

        console.log('\n🎉 Migration complete!\n');
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

// Run migration
migrate();
