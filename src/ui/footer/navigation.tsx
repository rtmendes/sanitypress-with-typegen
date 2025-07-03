import { getSite } from '@/sanity/lib/queries'
import SanityLink from '../sanity-link'

export default async function () {
	const site = await getSite()

	return (
		<nav>
			<ul className="flex items-center justify-center gap-x-4 max-md:flex-col">
				{site?.footer?.items?.map((item) => {
					switch (item._type) {
						case 'link':
							return (
								<SanityLink
									{...(item as unknown as React.ComponentProps<
										typeof SanityLink
									>)}
									className="link"
								/>
							)

						default:
							return null
					}
				})}
			</ul>
		</nav>
	)
}
