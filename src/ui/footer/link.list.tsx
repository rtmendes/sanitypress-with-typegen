import SanityLink, { type SanityLinkType } from '@/ui/sanity-link'
import type { LinkList } from '@/sanity/types'

export default function ({
	_key,
	_type,
	link,
	links,
	...props
}: (LinkList | any) & React.ComponentProps<'div'>) {
	return (
		<div {...props}>
			<div>{link?.label}</div>
			<ul>
				{links?.map((item: SanityLinkType) => (
					<li key={item._key}>
						<SanityLink {...item} />
					</li>
				))}
			</ul>
		</div>
	)
}
