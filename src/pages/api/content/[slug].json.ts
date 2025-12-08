import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

// Generate static paths for all gems
export async function getStaticPaths() {
  const gemsPath = path.join(process.cwd(), 'src', 'data', 'gems.json');
  const gemsData = JSON.parse(fs.readFileSync(gemsPath, 'utf-8'));

  return gemsData.map((gem: any) => ({
    params: { slug: gem.slug },
    props: { gem },
  }));
}

export const GET: APIRoute = ({ props }) => {
  const { gem } = props as { gem: any };

  return new Response(
    JSON.stringify({
      slug: gem.slug,
      content: gem.content // Raw markdown content from gems.json
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
};
