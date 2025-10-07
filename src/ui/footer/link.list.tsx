import SanityLink, { type SanityLinkType } from '@/ui/sanity-link'
import type { LinkList } from '@/sanity/types'

export default function ({
	_key,
	_type,
	link,
	links,
	...props
}: (LinkList | any) & React.ComponentProps<'li'>) {
	return (
		<li {...props}>
			<div>
				<b>{link?.label}</b>
			</div>
			<ul>
				{links?.map((item: SanityLinkType) => (
					<li key={item._key}>
						<SanityLink className="link" link={item} />
					</li>
				))}
			</ul>
		</li>
	)
}
