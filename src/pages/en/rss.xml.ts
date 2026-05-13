import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog-en', ({ data }) => !data.draft);
  return rss({
    title: 'Michel Banagouro — Blog',
    description: 'Notes, tutorials and thoughts on software, AI and product.',
    site: context.site ?? 'https://mbanagouro.com.br',
    items: posts
      .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
      .map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/en/blog/${post.id}`,
      })),
    customData: '<language>en-US</language>',
  });
}
