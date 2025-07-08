import { sanityFetchLive } from '@/sanity/lib/live'
import { groq, PortableText } from 'next-sanity'
import PostPreview from './post-preview'
import { BLOG_DIR } from '@/lib/env'
import type { BLOG_POST_LIST_QUERYResult, BlogPostList } from '@/sanity/types'

export default async function ({ intro, limit = 6 }: BlogPostList) {
	const posts = await sanityFetchLive<BLOG_POST_LIST_QUERYResult>({
		query: BLOG_POST_LIST_QUERY,
		params: { limit },
		tags: ['blog-post-list'],
	})

	return (
		<section className="section">
			<header className="prose">
				<PortableText value={intro ?? []} />
			</header>

			<ul className="carousel max-md:full-bleed gap-4 max-md:px-4 md:mask-r-from-[calc(100%-2rem)] md:pr-4">
				{posts?.map((post) => (
					<PostPreview
						post={
							post as unknown as React.ComponentProps<
								typeof PostPreview
							>['post']
						}
						key={post._id}
					/>
				))}
			</ul>
		</section>
	)
}

const BLOG_POST_LIST_QUERY = groq`
	*[_type == 'blog.post']|order(publishDate desc)[0...$limit]{
		...,
		metadata{
			...,
			image{
				...,
				asset->
			}
		},
		'slug': '/${BLOG_DIR}/' + metadata.slug.current,
	}
`
