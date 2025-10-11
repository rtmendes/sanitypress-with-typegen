import HoverDetails from '@/ui/hover-details'
import SanityLink from '@/ui/sanity-link'
import type { LinkList, Page } from '@/sanity/types'

export default function (props: LinkList | any) {
	const { link: summary, links } = props as LinkList

	return (
		<HoverDetails className="accordion relative">
			<summary>
				{summary?.label || (summary?.internal as unknown as Page)?.title}
			</summary>

			<ul className="md:bg-background anim-fade-to-b border-stroke max-md:pl-ch top-full -left-4 max-md:border-l md:absolute md:min-w-max md:p-3 md:shadow-lg">
				{links?.map((link, key) => (
					<li key={key}>
						<SanityLink link={link} className="link" />
					</li>
				))}
			</ul>
		</HoverDetails>
	)
}
