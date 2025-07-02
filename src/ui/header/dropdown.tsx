import { cn } from '@/lib/utils'
import HoverDetails from '@/ui/hover-details'
import SanityLink from '@/ui/sanity-link'

export default function ({
	link: summary,
	links,
}: {
	link: React.ComponentProps<typeof SanityLink>
	links: React.ComponentProps<typeof SanityLink>[]
}) {
	return (
		<HoverDetails className="relative">
			<summary>{summary?.label || summary?.internal?.title}</summary>

			<ul className="md:bg-background anim-fade-to-b top-full left-0 max-md:pl-4 md:absolute md:min-w-max md:border">
				{links.map((link, key) => (
					<li key={key}>
						<SanityLink className="link" {...link} />
					</li>
				))}
			</ul>
		</HoverDetails>
	)
}
