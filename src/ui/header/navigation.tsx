import { getSite } from '@/sanity/lib/queries'
import SanityLink from '@/ui/sanity-link'
import Dropdown from './dropdown'

export default async function () {
	const site = await getSite()

	return (
		<nav className="max-md:header-not-open:hidden flex gap-x-4 [grid-area:navigation] max-md:flex-col">
			{site?.header?.items?.map((item) => {
				switch (item._type) {
					case 'link':
						return <SanityLink link={item} className="link" key={item._key} />

					case 'link.list':
						return <Dropdown {...item} key={item._key} />

					default:
						return null
				}
			})}
		</nav>
	)
}
