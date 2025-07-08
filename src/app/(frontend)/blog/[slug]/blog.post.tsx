import { PortableText } from 'next-sanity'
import TableOfContents from '@/ui/modules/prose/table-of-contents'
import Date from '@/ui/modules/blog/date'
import Image from '@/ui/modules/prose/image'
import type { BLOG_POST_QUERYResult } from '@/sanity/types'

export default function ({ post }: { post: BLOG_POST_QUERYResult }) {
	if (!post) return null

	return (
		<>
			<section className="section">
				<header className="prose text-center">
					<h1>{post.title || post.metadata?.title}</h1>
					<Date date={post.publishDate} />
				</header>

				<div className="flex gap-4 max-md:flex-col md:items-start">
					<TableOfContents
						headings={post.headings}
						className="top-(--header-height) shrink-0 md:sticky md:w-[20ch]"
						open
					/>

					<article className="prose">
						<PortableText
							value={post.content ?? []}
							components={{
								types: {
									image: Image,
								},
							}}
						/>
					</article>
				</div>
			</section>
		</>
	)
}
