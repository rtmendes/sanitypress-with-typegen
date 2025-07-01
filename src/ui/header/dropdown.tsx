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

			<ul className="bg-background anim-fade-to-b absolute top-full left-0 min-w-max border">
				{links.map((link, key) => (
					<li key={key}>
						<SanityLink {...link} />
					</li>
				))}
			</ul>
		</HoverDetails>
	)
}
