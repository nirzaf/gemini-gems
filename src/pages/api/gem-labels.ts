import type { APIRoute } from 'astro';
import { getGemLabels, assignLabelToGem, removeLabelFromGem, getGemsByLabel } from '../../lib/db-utils';

// GET: Fetch labels for a specific gem or gems by label
export const GET: APIRoute = async ({ url }) => {
    try {
        const gemSlug = url.searchParams.get('gemSlug');
        const labelId = url.searchParams.get('labelId');

        if (gemSlug) {
            // Get labels for specific gem
            const labels = await getGemLabels(gemSlug);
            return new Response(
                JSON.stringify({ success: true, labels }),
                { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
        } else if (labelId) {
            // Get gems by label
            const gems = await getGemsByLabel(parseInt(labelId));
            return new Response(
                JSON.stringify({ success: true, gems }),
                { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
        } else {
            return new Response(
                JSON.stringify({ error: 'gemSlug or labelId is required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }
    } catch (error) {
        console.error('Error fetching gem labels:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to fetch gem labels' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};

// POST: Assign label to gem
export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { gemSlug, labelId } = body;

        if (!gemSlug || !labelId) {
            return new Response(
                JSON.stringify({ error: 'gemSlug and labelId are required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        await assignLabelToGem(gemSlug, labelId);

        return new Response(
            JSON.stringify({ success: true }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error assigning label to gem:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to assign label to gem' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};

// DELETE: Remove label from gem
export const DELETE: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { gemSlug, labelId } = body;

        if (!gemSlug || !labelId) {
            return new Response(
                JSON.stringify({ error: 'gemSlug and labelId are required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        await removeLabelFromGem(gemSlug, labelId);

        return new Response(
            JSON.stringify({ success: true }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error removing label from gem:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to remove label from gem' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
