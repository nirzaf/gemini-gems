import type { APIRoute } from 'astro';
import { getLabels, createLabel, updateLabel, deleteLabel } from '../../lib/db-utils';

// GET: Fetch all labels
export const GET: APIRoute = async () => {
    try {
        const labels = await getLabels();

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

        const label = await createLabel(name, color, description);

        return new Response(
            JSON.stringify({ success: true, label }),
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

        const label = await updateLabel(id, name, color, description);

        return new Response(
            JSON.stringify({ success: true, label }),
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

        await deleteLabel(id);

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
