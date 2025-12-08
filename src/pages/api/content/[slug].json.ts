import { db } from '../../../db';
import { gems as gemsSchema } from '../../../db/schema';
import { eq } from 'drizzle-orm';

// Generate static paths for all gems
export async function getStaticPaths() {
    if (!db) {
        throw new Error("Database connection not available");
    }
    const gems = await db.select().from(gemsSchema);
    return gems.map((gem) => ({
        params: { slug: gem.slug },
        props: { gem },
    }));
}

// Output the raw body content as JSON
export async function GET({ props }) {
    const { gem } = props;
    return new Response(
        JSON.stringify({
            slug: gem.slug,
            content: gem.content // This is the raw markdown content from DB
        }),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
}
