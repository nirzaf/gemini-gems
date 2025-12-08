import { db } from './index';
import { gems } from './schema';
import { sql } from 'drizzle-orm';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrateGemsToDatabase() {
    console.log('🚀 Migrating gem markdown files to database...\n');

    try {
        // Create gems table
        await db.run(sql`
      CREATE TABLE IF NOT EXISTS gems (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        icon TEXT NOT NULL,
        color TEXT NOT NULL,
        features TEXT NOT NULL,
        content TEXT NOT NULL,
        last_updated TEXT DEFAULT CURRENT_TIMESTAMP,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);
        console.log('✅ Created gems table\n');

        // Read all gem markdown files from content/gems directory
        const gemsDir = path.join(__dirname, '../../src/content/gems');
        const gemFiles = fs.readdirSync(gemsDir).filter(file => file.endsWith('.md'));

        console.log(`📁 Found ${gemFiles.length} gem files to migrate\n`);

        for (const file of gemFiles) {
            const filePath = path.join(gemsDir, file);
            const content = fs.readFileSync(filePath, 'utf-8');

            // Parse frontmatter
            const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

            if (!frontmatterMatch) {
                console.log(`⚠️  Skipping ${file} - no frontmatter found`);
                continue;
            }

            const frontmatter = frontmatterMatch[1];
            const markdownContent = frontmatterMatch[2];

            // Parse frontmatter fields
            const titleMatch = frontmatter.match(/title:\s*"([^"]+)"/);
            const descMatch = frontmatter.match(/description:\s*"([^"]+)"/);
            const categoryMatch = frontmatter.match(/category:\s*"([^"]+)"/);
            const iconMatch = frontmatter.match(/icon:\s*"([^"]+)"/);
            const colorMatch = frontmatter.match(/color:\s*"([^"]+)"/);
            const featuresMatch = frontmatter.match(/features:\n((?:\s*-\s*"[^"]+"\n)+)/);

            if (!titleMatch || !descMatch || !categoryMatch) {
                console.log(`⚠️  Skipping ${file} - missing required fields`);
                continue;
            }

            const features = featuresMatch
                ? featuresMatch[1].match(/"([^"]+)"/g)?.map(f => f.replace(/"/g, '')) || []
                : [];

            const slug = file.replace('.md', '');

            const gemData = {
                slug,
                title: titleMatch[1],
                description: descMatch[1],
                category: categoryMatch[1],
                icon: iconMatch ? iconMatch[1] : 'file',
                color: colorMatch ? colorMatch[1] : 'bg-gray-500',
                features: JSON.stringify(features),
                content: markdownContent.trim(),
            };

            try {
                await db.insert(gems).values(gemData).onConflictDoUpdate({
                    target: gems.slug,
                    set: gemData,
                });
                console.log(`✅ Migrated: ${gemData.title}`);
            } catch (error) {
                console.error(`❌ Failed to migrate ${file}:`, error);
            }
        }

        console.log('\n🎉 Gem migration complete!\n');
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

// Run migration
migrateGemsToDatabase();
