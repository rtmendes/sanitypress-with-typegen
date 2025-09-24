import { PortableText } from 'next-sanity'
import TableOfContents from '@/ui/modules/prose/table-of-contents'
import Author from '@/ui/modules/blog/author'
import Categories from '@/ui/modules/blog/categories'
import Date from '@/ui/modules/blog/date'
import Image from '@/ui/modules/prose/image'
import Code from '@/ui/modules/prose/code'
import AnchoredHeading from '@/ui/modules/prose/anchored-heading'
import type {
	BLOG_POST_QUERYResult,
	Person,
	BlogCategory,
} from '@/sanity/types'
import CustomHTML from '../custom-html'
import { moduleAttributes } from '..'
import css from './blog-post-content.module.css'
import { cn } from '@/lib/utils'

export default function ({ post, ...props }: { post: BLOG_POST_QUERYResult }) {
	if (!post) return null

	return (
		<>
			<section className="section space-y-4" {...moduleAttributes(props)}>
				<header className="space-y-4 text-center">
					<h1 className="h1">{post.title || post.metadata?.title}</h1>
					<div className="flex flex-wrap items-center justify-center gap-x-4">
						<Author author={post.author as unknown as Person} />
						<Date date={post.publishDate} />
						<Categories categories={post.categories as BlogCategory[]} />
					</div>
				</header>

				<div className="flex gap-4 max-md:flex-col md:items-start">
					<TableOfContents
						headings={post.headings}
						className="top-(--header-height) shrink-0 md:sticky md:w-[20ch]"
						open
					/>

					<article className={cn(css.body, 'prose grid w-full')}>
						<PortableText
							value={post.content ?? []}
							components={{
								block: {
									h1: (node) => <AnchoredHeading as="h1" {...node} />,
									h2: (node) => <AnchoredHeading as="h2" {...node} />,
									h3: (node) => <AnchoredHeading as="h3" {...node} />,
									h4: (node) => <AnchoredHeading as="h4" {...node} />,
									h5: (node) => <AnchoredHeading as="h5" {...node} />,
									h6: (node) => <AnchoredHeading as="h6" {...node} />,
								},
								types: {
									image: Image,
									code: Code,
									'custom-html': ({ value }) => <CustomHTML {...value} />,
								},
							}}
						/>
					</article>
				</div>
			</section>
		</>
	)
}
