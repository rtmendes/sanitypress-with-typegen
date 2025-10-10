import SanityLink from '@/ui/sanity-link'
import Img from '@/ui/img'
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
		<li className={cn('relative space-y-2', className)}>
			<figure className="bg-foreground/5 aspect-video">
				<Img
					className="grid aspect-video w-full place-items-center object-cover"
					image={post.metadata?.image}
					width={600}
					alt={post.title ?? ''}
				/>
			</figure>

			<SanityLink
				className="link block"
				link={{
					type: 'internal',
					internal: post,
				}}
			>
				<strong>{post.title}</strong>
				<span className="absolute inset-0" />
			</SanityLink>

			{post.metadata?.description && (
				<p className="line-clamp-3">{post.metadata?.description}</p>
			)}

			<div className="flex flex-wrap items-center justify-between gap-x-4">
				<Byline author={post.author as unknown as Person} />
				<Date date={post.publishDate} />
			</div>

			<div>
				<Categories categories={post.categories as unknown as BlogCategory[]} />
			</div>
		</li>
	)
}
