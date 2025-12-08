import type { APIRoute } from 'astro';
import { db } from '../../db';
import { gems } from '../../db/schema';
import { eq } from 'drizzle-orm';

// GET: Fetch all gems or a specific gem by slug
export const GET: APIRoute = async ({ url }) => {
    try {
        const slug = url.searchParams.get('slug');

        if (slug) {
            // Fetch specific gem
            const gem = await db.select().from(gems).where(eq(gems.slug, slug)).limit(1);

            if (gem.length === 0) {
                return new Response(
                    JSON.stringify({ error: 'Gem not found' }),
                    { status: 404, headers: { 'Content-Type': 'application/json' } }
                );
            }

            // Parse features from JSON string
            const gemData = {
                ...gem[0],
                features: JSON.parse(gem[0].features),
            };

            return new Response(
                JSON.stringify({ success: true, gem: gemData }),
                { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
        } else {
            // Fetch all gems
            const allGems = await db.select().from(gems);

            // Parse features for all gems
            const gemsData = allGems.map(gem => ({
                ...gem,
                features: JSON.parse(gem.features),
            }));

            return new Response(
                JSON.stringify({ success: true, gems: gemsData }),
                { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
        }
    } catch (error) {
        console.error('Error fetching gems:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to fetch gems' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};

// POST: Create new gem
export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { slug, title, description, category, icon, color, features, content } = body;

        if (!slug || !title || !description || !category || !content) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const result = await db.insert(gems).values({
            slug,
            title,
            description,
            category,
            icon: icon || 'file',
            color: color || 'bg-gray-500',
            features: JSON.stringify(features || []),
            content,
        }).returning();

        return new Response(
            JSON.stringify({ success: true, gem: result[0] }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error creating gem:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to create gem' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};

// PUT: Update existing gem
export const PUT: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { slug, title, description, category, icon, color, features, content } = body;

        if (!slug) {
            return new Response(
                JSON.stringify({ error: 'slug is required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const updateData: any = { lastUpdated: new Date().toISOString() };
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (category) updateData.category = category;
        if (icon) updateData.icon = icon;
        if (color) updateData.color = color;
        if (features) updateData.features = JSON.stringify(features);
        if (content) updateData.content = content;

        const result = await db.update(gems)
            .set(updateData)
            .where(eq(gems.slug, slug))
            .returning();

        return new Response(
            JSON.stringify({ success: true, gem: result[0] }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error updating gem:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to update gem' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};

// DELETE: Remove gem
export const DELETE: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { slug } = body;

        if (!slug) {
            return new Response(
                JSON.stringify({ error: 'slug is required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        await db.delete(gems).where(eq(gems.slug, slug));

        return new Response(
            JSON.stringify({ success: true }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error deleting gem:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to delete gem' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
