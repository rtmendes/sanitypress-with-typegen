import SanityLink from '@/ui/sanity-link'
import Img from '@/ui/img'
import Date from './date'
import type { BlogPost } from '@/sanity/types'

export default function ({ post }: { post: BlogPost }) {
	return (
		<li className="relative">
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

			<Date date={post.publishDate} />
		</li>
	)
}
