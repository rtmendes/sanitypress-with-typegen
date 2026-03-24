import { cn } from '@/lib/utils'
import type { LinkList } from '@/sanity/types'
import SanityLink, { type SanityLinkType } from '@/ui/sanity-link'

export default function ({
	link,
	links,
	className,
	_type,
	_key,
	...props
}: LinkList & React.ComponentProps<'li'> & Partial<{ _key: string }>) {
	return (
		<li className={cn('text-left', className)} {...props}>
			<div>
				<b>{link?.label}</b>
			</div>

			<ul>
				{links?.map((item) => (
					<li key={item._key}>
						<SanityLink className="link" link={item as SanityLinkType} />
					</li>
				))}
			</ul>
		</li>
	)
}
