import { db } from '../db';
import { gemsStats, gemLabels, gemLabelMappings } from '../db/schema';
import { eq, desc, sql } from 'drizzle-orm';

// --- Stats Functions ---

export async function getGemStats(gemSlug?: string) {
    try {
        if (!db) return gemSlug ? null : [];

        if (gemSlug) {
            const result = await db.select().from(gemsStats).where(eq(gemsStats.gemSlug, gemSlug)).limit(1);
            return result[0] || null;
        } else {
            // Return all stats sorted by copy count
            return await db.select().from(gemsStats).orderBy(desc(gemsStats.copyCount));
        }
    } catch (error) {
        console.error('Error getting gem stats:', error);
        return gemSlug ? null : [];
    }
}

// --- Label Functions (Ported to Drizzle) ---

export async function getLabels() {
    try {
        if (!db) return [];
        return await db.select().from(gemLabels).orderBy(gemLabels.name);
    } catch (error) {
        console.error('Error getting labels:', error);
        return [];
    }
}

export async function createLabel(name: string, color: string, description?: string) {
    try {
        if (!db) throw new Error('DB not connected');
        const result = await db.insert(gemLabels).values({
            name,
            color,
            description
        }).returning();
        return result[0];
    } catch (error) {
        console.error('Error creating label:', error);
        throw error;
    }
}

export async function updateLabel(id: number, name: string, color: string, description?: string) {
    try {
        if (!db) throw new Error('DB not connected');
        const result = await db.update(gemLabels)
            .set({ name, color, description, updatedAt: new Date() })
            .where(eq(gemLabels.id, id))
            .returning();
        return result[0];
    } catch (error) {
        console.error('Error updating label:', error);
        throw error;
    }
}

export async function deleteLabel(id: number) {
    try {
        if (!db) throw new Error('DB not connected');
        await db.delete(gemLabels).where(eq(gemLabels.id, id));
    } catch (error) {
        console.error('Error deleting label:', error);
        throw error;
    }
}

// --- Gem-Label Mapping Functions ---

export async function assignLabelToGem(gemSlug: string, labelId: number) {
    try {
        if (!db) throw new Error('DB not connected');
        // Drizzle doesn't have a direct "INSERT OR IGNORE" in standard API easily without raw SQL or specific driver support,
        // but we can check existence or use onConflictDoNothing if supported by the driver/dialect.
        // For simplicity and safety with Neon/Postgres:
        await db.insert(gemLabelMappings)
            .values({ gemSlug, labelId })
            .onConflictDoNothing();
    } catch (error) {
        console.error('Error assigning label to gem:', error);
        throw error;
    }
}

export async function removeLabelFromGem(gemSlug: string, labelId: number) {
    try {
        if (!db) throw new Error('DB not connected');
        await db.delete(gemLabelMappings)
            .where(sql`${gemLabelMappings.gemSlug} = ${gemSlug} AND ${gemLabelMappings.labelId} = ${labelId}`);
    } catch (error) {
        console.error('Error removing label from gem:', error);
        throw error;
    }
}

export async function getGemLabels(gemSlug: string) {
    try {
        if (!db) return [];
        // Perform a join to get label details for a specific gem
        const result = await db
            .select({
                id: gemLabels.id,
                name: gemLabels.name,
                color: gemLabels.color,
                description: gemLabels.description
            })
            .from(gemLabelMappings)
            .innerJoin(gemLabels, eq(gemLabelMappings.labelId, gemLabels.id))
            .where(eq(gemLabelMappings.gemSlug, gemSlug))
            .orderBy(gemLabels.name);

        return result;
    } catch (error) {
        console.error('Error getting gem labels:', error);
        return [];
    }
}

export async function getGemsByLabel(labelId: number) {
    try {
        if (!db) return [];
        const result = await db
            .select({ gemSlug: gemLabelMappings.gemSlug })
            .from(gemLabelMappings)
            .where(eq(gemLabelMappings.labelId, labelId));
        return result.map(row => row.gemSlug);
    } catch (error) {
        console.error('Error getting gems by label:', error);
        throw error;
    }
}
