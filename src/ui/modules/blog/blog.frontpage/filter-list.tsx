import { sanityFetchLive } from '@/sanity/lib/live'
import { groq } from 'next-sanity'
import Filter from './filter'
import { CATEGORIES_QUERYResult } from '@/sanity/types'

export default async function () {
	const categories = await sanityFetchLive<CATEGORIES_QUERYResult>({
		query: CATEGORIES_QUERY,
	})

	return (
		<div className="flex flex-wrap items-center gap-2">
			<Filter>All</Filter>

			{categories?.map((category) => (
				<Filter category={category} key={category._id} />
			))}
		</div>
	)
}

const CATEGORIES_QUERY = groq`
	*[
		_type == 'blog.category'
		&& count(*[_type == 'blog.post' && references(^._id)]) > 0
	]|order(title)
`
