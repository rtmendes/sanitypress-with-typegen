import SanityLink from '@/ui/sanity-link'
import Img from '@/ui/img'
import Date from './date'
import Author from './author'
import Categories from './categories'
import { cn } from '@/lib/utils'
import type { BlogCategory, Person, BlogPost } from '@/sanity/types'

export default function ({
	post,
	className,
}: { post: BlogPost } & React.ComponentProps<'li'>) {
	return (
		<li className={cn('relative', className)}>
			<figure className="bg-foreground/5 aspect-video">
				<Img
					className="grid aspect-video w-full place-items-center object-cover"
					image={post.metadata?.image}
					width={600}
					alt={post.title ?? ''}
				/>
			</figure>

			<SanityLink
				link={{
					type: 'internal',
					internal: post,
				}}
			>
				{post.title}
				<span className="absolute inset-0" />
			</SanityLink>

			<p className="line-clamp-3">{post.metadata?.description}</p>

			<div className="flex flex-wrap items-center gap-x-4">
				<Author author={post.author as unknown as Person} />
				<Date date={post.publishDate} />
				<Categories categories={post.categories as unknown as BlogCategory[]} />
			</div>
		</li>
	)
}
