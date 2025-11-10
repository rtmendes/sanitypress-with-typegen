import type { LinkList, Page } from '@/sanity/types'
import HoverDetails from '@/ui/hover-details'
import SanityLink, { type SanityLinkType } from '@/ui/sanity-link'

export default function ({ link: summary, links }: LinkList) {
	return (
		<HoverDetails className="accordion relative" safeAreaOnHover>
			<summary>
				{summary?.label || (summary?.internal as unknown as Page)?.title}
			</summary>

			<ul className="md:bg-background anim-fade-to-b border-stroke max-md:pl-ch top-full -left-4 z-1 max-md:border-l md:absolute md:min-w-max md:p-3 md:shadow-lg">
				{links?.map((link, key) => (
					<li key={key}>
						<SanityLink link={link as SanityLinkType} className="link" />
					</li>
				))}
			</ul>
		</HoverDetails>
	)
}
