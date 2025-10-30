import { groq, PortableText } from 'next-sanity'
import { ROUTES } from '@/lib/env'
import { sanityFetchLive } from '@/sanity/lib/live'
import type { BlogPost, BlogPostList } from '@/sanity/types'
import PostPreview from './post-preview'

export default async function ({
	intro = [],
	limit = 6,
	_key,
}: BlogPostList & { _key: string }) {
	const posts = await sanityFetchLive<any>({
		query: BLOG_POST_LIST_QUERY,
		params: { limit, blogDir: `${ROUTES.blog}` },
	})

	return (
		<section className="section space-y-4">
			<header className="prose">
				<PortableText value={intro} />
			</header>

			<ul
				className="carousel max-md:full-bleed items-start gap-4 pb-2 max-md:px-4 md:mask-r-from-[calc(100%-2rem)] md:pr-4"
				data-anchor-name={`--blog-post-list-${_key}`}
			>
				{posts?.map((post: any) => (
					<PostPreview
						className="md:snap-start"
						post={post as unknown as BlogPost}
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
		categories[]->{
			title,
			slug
		},
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
		'slug': $blogDir + metadata.slug.current,
	}
`
