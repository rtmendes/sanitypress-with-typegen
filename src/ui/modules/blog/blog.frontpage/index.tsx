import { groq, PortableText } from 'next-sanity'
import { Suspense } from 'react'
import { BLOG_DIR } from '@/lib/env'
import { sanityFetchLive } from '@/sanity/lib/live'
import type { BLOG_FRONTPAGE_QUERYResult, BlogFrontpage } from '@/sanity/types'
import Loading from '@/ui/loading'
import FilterList from './filter-list'
import PaginatedPosts from './paginated-posts'
import SortBy from './sort-by'

export default async function ({ intro = [], postsPerPage }: BlogFrontpage) {
	const posts = await sanityFetchLive<BLOG_FRONTPAGE_QUERYResult>({
		query: BLOG_FRONTPAGE_QUERY,
	})

	return (
		<section className="section space-y-4">
			<header className="prose">
				<PortableText value={intro} />
			</header>

			<fieldset className="flex flex-wrap items-end justify-between gap-4">
				<Suspense
					fallback={
						<Loading className="p-[.25em_.5em]">Loading categories...</Loading>
					}
				>
					<FilterList />
					<SortBy />
				</Suspense>
			</fieldset>

			<Suspense fallback={<Loading>Loading posts...</Loading>}>
				<PaginatedPosts posts={posts} postsPerPage={postsPerPage} />
			</Suspense>
		</section>
	)
}

const BLOG_FRONTPAGE_QUERY = groq`
	*[_type == 'blog.post']|order(publishDate desc){
		...,
		categories[]->,
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
