import tursoClient from './db-config';

// Gem Statistics Functions
export async function incrementCopyCount(gemSlug: string): Promise<void> {
    try {
        // Check if gem exists in stats table
        const result = await tursoClient.execute({
            sql: 'SELECT id FROM gems_stats WHERE gem_slug = ?',
            args: [gemSlug],
        });

        if (result.rows.length === 0) {
            // Insert new record
            await tursoClient.execute({
                sql: 'INSERT INTO gems_stats (gem_slug, copy_count, view_count) VALUES (?, 1, 0)',
                args: [gemSlug],
            });
        } else {
            // Update existing record
            await tursoClient.execute({
                sql: 'UPDATE gems_stats SET copy_count = copy_count + 1, updated_at = CURRENT_TIMESTAMP WHERE gem_slug = ?',
                args: [gemSlug],
            });
        }
    } catch (error) {
        console.error('Error incrementing copy count:', error);
        throw error;
    }
}

export async function incrementViewCount(gemSlug: string): Promise<void> {
    try {
        const result = await tursoClient.execute({
            sql: 'SELECT id FROM gems_stats WHERE gem_slug = ?',
            args: [gemSlug],
        });

        if (result.rows.length === 0) {
            await tursoClient.execute({
                sql: 'INSERT INTO gems_stats (gem_slug, copy_count, view_count) VALUES (?, 0, 1)',
                args: [gemSlug],
            });
        } else {
            await tursoClient.execute({
                sql: 'UPDATE gems_stats SET view_count = view_count + 1, updated_at = CURRENT_TIMESTAMP WHERE gem_slug = ?',
                args: [gemSlug],
            });
        }
    } catch (error) {
        console.error('Error incrementing view count:', error);
        throw error;
    }
}

export async function getGemStats(gemSlug?: string) {
    try {
        if (gemSlug) {
            // Get stats for specific gem
            const result = await tursoClient.execute({
                sql: 'SELECT * FROM gems_stats WHERE gem_slug = ?',
                args: [gemSlug],
            });
            return result.rows[0] || null;
        } else {
            // Get all gem stats
            const result = await tursoClient.execute('SELECT * FROM gems_stats ORDER BY copy_count DESC');
            return result.rows;
        }
    } catch (error) {
        console.error('Error getting gem stats:', error);
        throw error;
    }
}

// Label Management Functions
export async function getLabels() {
    try {
        const result = await tursoClient.execute('SELECT * FROM gem_labels ORDER BY name ASC');
        return result.rows;
    } catch (error) {
        console.error('Error getting labels:', error);
        throw error;
    }
}

export async function createLabel(name: string, color: string, description?: string) {
    try {
        const result = await tursoClient.execute({
            sql: 'INSERT INTO gem_labels (name, color, description) VALUES (?, ?, ?) RETURNING *',
            args: [name, color, description || ''],
        });
        return result.rows[0];
    } catch (error) {
        console.error('Error creating label:', error);
        throw error;
    }
}

export async function updateLabel(id: number, name: string, color: string, description?: string) {
    try {
        const result = await tursoClient.execute({
            sql: 'UPDATE gem_labels SET name = ?, color = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? RETURNING *',
            args: [name, color, description || '', id],
        });
        return result.rows[0];
    } catch (error) {
        console.error('Error updating label:', error);
        throw error;
    }
}

export async function deleteLabel(id: number) {
    try {
        await tursoClient.execute({
            sql: 'DELETE FROM gem_labels WHERE id = ?',
            args: [id],
        });
    } catch (error) {
        console.error('Error deleting label:', error);
        throw error;
    }
}

// Gem-Label Mapping Functions
export async function assignLabelToGem(gemSlug: string, labelId: number) {
    try {
        await tursoClient.execute({
            sql: 'INSERT OR IGNORE INTO gem_label_mappings (gem_slug, label_id) VALUES (?, ?)',
            args: [gemSlug, labelId],
        });
    } catch (error) {
        console.error('Error assigning label to gem:', error);
        throw error;
    }
}

export async function removeLabelFromGem(gemSlug: string, labelId: number) {
    try {
        await tursoClient.execute({
            sql: 'DELETE FROM gem_label_mappings WHERE gem_slug = ? AND label_id = ?',
            args: [gemSlug, labelId],
        });
    } catch (error) {
        console.error('Error removing label from gem:', error);
        throw error;
    }
}

export async function getGemLabels(gemSlug: string) {
    try {
        const result = await tursoClient.execute({
            sql: `
        SELECT gl.* 
        FROM gem_labels gl
        INNER JOIN gem_label_mappings glm ON gl.id = glm.label_id
        WHERE glm.gem_slug = ?
        ORDER BY gl.name ASC
      `,
            args: [gemSlug],
        });
        return result.rows;
    } catch (error) {
        console.error('Error getting gem labels:', error);
        throw error;
    }
}

export async function getGemsByLabel(labelId: number) {
    try {
        const result = await tursoClient.execute({
            sql: 'SELECT gem_slug FROM gem_label_mappings WHERE label_id = ?',
            args: [labelId],
        });
        return result.rows.map(row => row.gem_slug);
    } catch (error) {
        console.error('Error getting gems by label:', error);
        throw error;
    }
}
