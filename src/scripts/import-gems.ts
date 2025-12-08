import { db } from '../db';
import { gems as gemsSchema } from '../db/schema';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

async function importGems() {
    if (!db) {
        throw new Error("Database connection not available");
    }

    const gemsDir = path.join(process.cwd(), 'src', 'content', 'gems');
    console.log('Current working directory:', process.cwd());
    console.log('Looking for gems in:', gemsDir);

    try {
        const files = await fs.readdir(gemsDir);
        console.log(`Found ${files.length} files in directory.`);

        for (const file of files) {
            if (!file.endsWith('.md')) continue;

            const filePath = path.join(gemsDir, file);
            const content = await fs.readFile(filePath, 'utf-8');
            const { data, content: body } = matter(content);
            const slug = file.replace('.md', '');

            console.log(`Importing ${slug}...`);

            try {
                await db.insert(gemsSchema).values({
                    slug,
                    title: data.title,
                    description: data.description,
                    category: data.category,
                    icon: data.icon,
                    color: data.color,
                    features: JSON.stringify(data.features),
                    content: body,
                    lastUpdated: data.lastUpdated ? new Date(data.lastUpdated) : new Date(),
                }).onConflictDoUpdate({
                    target: gemsSchema.slug,
                    set: {
                        title: data.title,
                        description: data.description,
                        category: data.category,
                        icon: data.icon,
                        color: data.color,
                        features: JSON.stringify(data.features),
                        content: body,
                        lastUpdated: data.lastUpdated ? new Date(data.lastUpdated) : new Date(),
                    }
                });
                console.log(`✓ Imported ${slug}`);
            } catch (error) {
                console.error(`❌ Failed to import ${slug}:`, error);
            }
        }
    } catch (err) {
        console.error('Error reading directory:', err);
        process.exit(1);
    }

    console.log('Import complete.');
    process.exit(0);
}

importGems().catch((err) => {
    console.error('Failed to import gems:', err);
    process.exit(1);
});
