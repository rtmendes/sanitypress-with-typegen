import { sanityFetchLive } from '@/sanity/lib/live'
import { groq, PortableText } from 'next-sanity'
import PostPreview from './post-preview'
import { BLOG_DIR } from '@/lib/env'
import type { BLOG_FRONTPAGE_QUERYResult, BlogFrontpage } from '@/sanity/types'

export default async function ({ intro }: BlogFrontpage) {
	const posts = await sanityFetchLive<BLOG_FRONTPAGE_QUERYResult>({
		query: BLOG_FRONTPAGE_QUERY,
		tags: ['blog.frontpage'],
	})

	return (
		<section className="section">
			<header className="prose">
				<PortableText value={intro ?? []} />
			</header>

			<ul className="grid grid-cols-[repeat(auto-fill,minmax(var(--container-sm),1fr))] gap-4">
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

const BLOG_FRONTPAGE_QUERY = groq`
	*[_type == 'blog.post']|order(publishDate desc){
		...,
		author->{
			name,
			image{
				...,
				asset->
			}
		},
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
