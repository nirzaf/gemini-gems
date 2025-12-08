import type { APIRoute } from 'astro';
import { db } from '../../db';
import { gemLabels } from '../../db/schema';
import { eq } from 'drizzle-orm';

// GET: Fetch all labels
export const GET: APIRoute = async () => {
    try {
        const labels = await db.select().from(gemLabels);

        return new Response(
            JSON.stringify({ success: true, labels }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error fetching labels:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to fetch labels' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};

// POST: Create new label
export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { name, color, description } = body;

        if (!name || !color) {
            return new Response(
                JSON.stringify({ error: 'name and color are required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const result = await db.insert(gemLabels).values({ name, color, description }).returning();

        return new Response(
            JSON.stringify({ success: true, label: result[0] }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error creating label:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to create label' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};

// PUT: Update existing label
export const PUT: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { id, name, color, description } = body;

        if (!id || !name || !color) {
            return new Response(
                JSON.stringify({ error: 'id, name, and color are required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const result = await db.update(gemLabels)
            .set({ name, color, description, updatedAt: new Date() })
            .where(eq(gemLabels.id, id))
            .returning();

        return new Response(
            JSON.stringify({ success: true, label: result[0] }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error updating label:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to update label' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};

// DELETE: Remove label
export const DELETE: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { id } = body;

        if (!id) {
            return new Response(
                JSON.stringify({ error: 'id is required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        await db.delete(gemLabels).where(eq(gemLabels.id, id));

        return new Response(
            JSON.stringify({ success: true }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error deleting label:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to delete label' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
