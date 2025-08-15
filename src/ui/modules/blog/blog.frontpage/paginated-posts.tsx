'use client'

import { useQueryState } from 'nuqs'
import { useMemo } from 'react'
import { usePagination } from '@/hooks/use-pagination'
import PostPreview from '@/ui/modules/blog/post-preview'
import type { BLOG_FRONTPAGE_QUERYResult } from '@/sanity/types'

export default function ({
	posts,
	postsPerPage,
}: {
	posts: BLOG_FRONTPAGE_QUERYResult
	postsPerPage?: number
}) {
	const [category] = useQueryState('category')
	const [sortBy] = useQueryState('sortBy')

	const processedPosts = useMemo(
		() =>
			posts
				?.filter(
					(post) =>
						!category ||
						post.categories?.some((c) => c.slug?.current === category),
				)
				?.sort((a, b) => {
					if (sortBy === 'publishDate_desc')
						return b.publishDate!.localeCompare(a.publishDate!)
					if (sortBy === 'publishDate_asc')
						return a.publishDate!.localeCompare(b.publishDate!)
					if (sortBy === 'title_asc') return a.title!.localeCompare(b.title!)
					if (sortBy === 'title_desc') return b.title!.localeCompare(a.title!)
					return 0
				}),
		[category, sortBy],
	)

	const { paginatedItems, Pagination } = usePagination({
		items: processedPosts,
		itemsPerPage: postsPerPage,
	})

	return (
		<>
			<ul className="grid gap-4 sm:grid-cols-[repeat(auto-fill,minmax(var(--container-sm),1fr))]">
				{paginatedItems?.map((post) => (
					<PostPreview
						post={
							post as unknown as React.ComponentProps<
								typeof PostPreview
							>['post']
						}
						className="anim-fade"
						key={post._id}
					/>
				))}
			</ul>

			<Pagination
				className="gap-ch flex items-center justify-center tabular-nums"
				buttonClassName="cursor-pointer not-disabled:hover:underline disabled:opacity-50"
			/>
		</>
	)
}
