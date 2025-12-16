import type { APIRoute } from "astro";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export async function getStaticPaths() {
  const gemsDir = path.join(process.cwd(), "src", "content", "gems");
  const gemFiles = fs
    .readdirSync(gemsDir)
    .filter((file) => file.endsWith(".md"));

  return gemFiles.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const filePath = path.join(gemsDir, file);
    const source = fs.readFileSync(filePath, "utf-8");
    const { content, data } = matter(source);

    return {
      params: { slug },
      props: {
        slug,
        content,
        summary: data.summary || null,
      },
    };
  });
}

export const GET: APIRoute = ({ props }) => {
  const { slug, content, summary } = props as {
    slug: string;
    content: string;
    summary: string | null;
  };

  return new Response(
    JSON.stringify({
      slug,
      content,
      summary,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
