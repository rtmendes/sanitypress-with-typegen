import { PortableText } from 'next-sanity'
import TableOfContents from '@/ui/modules/prose/table-of-contents'
import type { BLOG_POST_QUERYResult } from '@/sanity/types'

export default function ({ post }: { post: BLOG_POST_QUERYResult }) {
	if (!post) return null

	return (
		<>
			<section className="section">
				<header className="text-center">
					<h1>{post.title || post.metadata?.title}</h1>
					{post.publishDate && (
						<time dateTime={post.publishDate}>{post.publishDate}</time>
					)}
				</header>

				<div className="flex gap-4 max-md:flex-col md:items-start">
					<TableOfContents
						headings={post.headings}
						className="top-(--header-height) shrink-0 md:sticky md:w-[20ch]"
						open
					/>

					<article className="prose">
						<PortableText value={post.content ?? []} />
					</article>
				</div>
			</section>
		</>
	)
}
