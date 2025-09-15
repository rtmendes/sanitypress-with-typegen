import { getSite } from '@/sanity/lib/queries'
import SanityLink from '@/ui/sanity-link'
import LinkList from './link.list'

export default async function () {
	const site = await getSite()

	return (
		<nav>
			<ul className="flex items-start justify-center gap-x-4 max-md:flex-col">
				{site?.footer?.items?.map((item) => {
					switch (item._type) {
						case 'link':
							return <SanityLink link={item} className="link" key={item._key} />

						case 'link.list':
							return (
								<LinkList {...item} className="text-left" key={item._key} />
							)

						default:
							return null
					}
				})}
			</ul>
		</nav>
	)
}
