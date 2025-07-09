import { sanityFetchLive } from '@/sanity/lib/live'
import { groq } from 'next-sanity'
import { BLOG_DIR } from '@/lib/env'
import type { MetadataRoute } from 'next'

export default async function (): Promise<MetadataRoute.Sitemap> {
	const data = await sanityFetchLive<Record<string, MetadataRoute.Sitemap>>({
		query: groq`{
			'pages': *[
				_type == 'page'
				&& defined(metadata.slug.current)
				&& !(metadata.slug.current in ['404'])
				&& metadata.noIndex != true
			]|order(metadata.slug.current != 'index', metadata.slug.current){
				'url': $baseUrl + select(
					metadata.slug.current == 'index' => '',
					'/' + metadata.slug.current
				),
				'lastModified': _updatedAt,
				'priority': select(
					metadata.slug.current == 'index' => 1,
					0.5
				)
			},
			'posts': *[
				_type == 'blog.post'
				&& defined(metadata.slug.current)
				&& metadata.noIndex != true
			]|order(publishDate desc){
				'url': $baseUrl + '/' + $blogDir + '/' + metadata.slug.current,
				'lastModified': _updatedAt,
				'priority': 0.4
			}
		}`,
		params: {
			baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
			blogDir: BLOG_DIR,
		},
	})

	return Object.values(data).flat()
}
