import { BLOG_DIR } from '@/lib/env'
import SanityLink from '@/ui/sanity-link'
import Img from '@/ui/img'
import Image from 'next/image'
import Date from './date'
import Byline from './byline'
import Categories from './categories'
import { cn } from '@/lib/utils'
import type { BlogCategory, Person, BlogPost } from '@/sanity/types'

export default function ({
	post,
	className,
}: { post: BlogPost } & React.ComponentProps<'li'>) {
	return (
		<li className={cn('relative grid gap-2', className)}>
			<figure className="bg-foreground/5 aspect-video">
				{post.metadata?.image ? (
					<Img
						className="aspect-video w-full object-cover"
						image={post.metadata?.image}
						width={400}
						alt={post.title ?? ''}
					/>
				) : (
					<Image
						src={`/api/og?slug=${BLOG_DIR}/${post.metadata?.slug?.current}&invert=1`}
						className="aspect-video w-full object-cover"
						alt={post.title ?? ''}
						width={400}
						height={(400 * 9) / 16}
					/>
				)}
			</figure>

			<SanityLink
				className="link block"
				link={{ type: 'internal', internal: post }}
			>
				<strong>{post.title}</strong>
				<span className="absolute inset-0" />
			</SanityLink>

			{post.metadata?.description && (
				<p className="line-clamp-3">{post.metadata?.description}</p>
			)}

			<div className="mt-auto flex flex-wrap items-center justify-between gap-x-4">
				<Byline author={post.author as unknown as Person} />
				<Date date={post.publishDate} />
			</div>

			{post.categories && (
				<div>
					<Categories
						categories={post.categories as unknown as BlogCategory[]}
					/>
				</div>
			)}
		</li>
	)
}
