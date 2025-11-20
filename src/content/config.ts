import { defineCollection, z } from 'astro:content';

const gemsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.string(),
        icon: z.string(),
        color: z.string(),
        features: z.array(z.string()),
    }),
});

export const collections = {
    gems: gemsCollection,
};
