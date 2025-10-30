import { PortableText, stegaClean } from 'next-sanity'
import { cn } from '@/lib/utils'
import { urlFor } from '@/sanity/lib/image'
import type {
	BLOG_POST_QUERYResult,
	BlogCategory,
	BlogPostContent,
	Person,
} from '@/sanity/types'
import Img from '@/ui/img'
import Byline from '@/ui/modules/blog/byline'
import Categories from '@/ui/modules/blog/categories'
import Date from '@/ui/modules/blog/date'
import CustomHTML from '@/ui/modules/custom-html'
import AnchoredHeading from '@/ui/modules/prose/anchored-heading'
import Code from '@/ui/modules/prose/code'
import Image from '@/ui/modules/prose/image'
import TableOfContents from '@/ui/table-of-contents'
import { moduleAttributes } from '..'
import css from './blog-post-content.module.css'

export default function ({
	post,
	tableOfContents,
	...props
}: { post: BLOG_POST_QUERYResult } & BlogPostContent) {
	if (!post) return null

	const toc = stegaClean(tableOfContents)

	return (
		<article {...moduleAttributes(props)}>
			<header
				className={cn(
					'section text-center',
					post.metadata?.image && 'relative',
				)}
			>
				<Img
					image={post.metadata?.image}
					imageOptions={{ blur: 30 }}
					width={1000}
					className="absolute inset-0 size-full object-cover opacity-10 delay-1000 duration-2000 starting:opacity-0"
					alt={post.metadata?.title ?? ''}
					draggable={false}
					loading="eager"
				/>

				<div className="relative space-y-4">
					<h1 className="h1">{post.title || post.metadata?.title}</h1>
					<div className="flex flex-wrap items-center justify-center gap-x-4">
						<Byline author={post.author as unknown as Person} />
						<Date date={post.publishDate} />
						<Categories categories={post.categories as BlogCategory[]} />
					</div>
				</div>
			</header>

			<section className="section flex gap-4 max-md:flex-col md:items-start">
				{(toc === 'left' || toc === 'right') && (
					<TableOfContents
						headings={post.headings}
						className={cn(
							'md:sticky-below-header shrink-0 [--offset:1rem] md:w-[20ch]',
							toc === 'right' && 'md:order-last',
						)}
						open
					/>
				)}

				<div className={cn(css.body, 'prose mx-auto grid w-full max-w-4xl')}>
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
								'custom-html': ({ value }) => (
									<CustomHTML {...value} className="my-6" />
								),
							},
						}}
					/>
				</div>
			</section>
		</article>
	)
}
