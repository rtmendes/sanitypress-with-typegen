import { PortableText } from 'next-sanity'
import TableOfContents from '@/ui/modules/prose/table-of-contents'
import Author from '@/ui/modules/blog/author'
import Date from '@/ui/modules/blog/date'
import Image from '@/ui/modules/prose/image'
import type { BLOG_POST_QUERYResult, Person } from '@/sanity/types'

export default function ({ post }: { post: BLOG_POST_QUERYResult }) {
	if (!post) return null

	return (
		<>
			<section className="section">
				<header className="prose text-center">
					<h1>{post.title || post.metadata?.title}</h1>
					<div className="flex flex-wrap items-center justify-center gap-x-4">
						<Author author={post.author as unknown as Person} />
						<Date date={post.publishDate} />
					</div>
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
