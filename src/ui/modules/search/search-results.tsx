'ues client'

import { useSearchStore } from './store'
import SanityLink, { type SanityLinkType } from '@/ui/sanity-link'

export default function () {
	const { results } = useSearchStore()

	if (!results.length) return null

	return (
		<ul>
			{results.map((result) => (
				<li key={result._id}>
					<SanityLink
						link={
							{
								type: 'internal',
								internal: result as any,
							} as SanityLinkType
						}
						className="group grid grid-cols-[1fr_auto] items-center gap-4"
					>
						<span className="group-hover:link line-clamp-1 grow break-all">
							{result.title}
						</span>

						<span className="text-foreground/50">
							{result._type == 'blog.post' ? 'Blog' : 'Page'}
						</span>
					</SanityLink>
				</li>
			))}
		</ul>
	)
}
