import SanityLink from '@/ui/sanity-link'
import Dropdown from './dropdown'
import type { SITE_QUERYResult } from '@/sanity/types'

export default function ({
	navigation,
}: {
	navigation?: NonNullable<SITE_QUERYResult>['header']
}) {
	return (
		<nav className="flex gap-4">
			{navigation?.items?.map((item) => {
				switch (item._type) {
					case 'link':
						return (
							<SanityLink
								className="link"
								{...(item as unknown as React.ComponentProps<
									typeof SanityLink
								>)}
								key={item._key}
							/>
						)

					case 'link.list':
						return (
							<Dropdown
								{...(item as unknown as React.ComponentProps<typeof Dropdown>)}
								key={item._key}
							/>
						)

					default:
						return null
				}
			})}
		</nav>
	)
}
