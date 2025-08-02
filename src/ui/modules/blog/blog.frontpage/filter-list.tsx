import { sanityFetchLive } from '@/sanity/lib/live'
import { groq } from 'next-sanity'
import Filter from './filter'

export default async function () {
	// TODO: add type
	const categories = await sanityFetchLive<any>({
		query: CATEGORIES_QUERY,
		tags: ['blog.category'],
	})

	return (
		<div className="flex flex-wrap items-center gap-2">
			<Filter>All</Filter>

			{/* TODO: fix type */}
			{/* @ts-ignore */}
			{categories?.map((category: any, i) => (
				<Filter category={category} key={i} />
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
