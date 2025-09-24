import { getSite } from '@/sanity/lib/queries'
import { PortableText } from 'next-sanity'
import Navigation from './navigation'
import SocialNavigation from '@/ui/social-navigation'

export default async function () {
	const site = await getSite()

	return (
		<footer>
			<div className="section space-y-4">
				<div className="flex gap-4 max-md:flex-col md:items-start">
					<div className="grid gap-4 max-md:text-center">
						<div className="font-bold">{site?.title}</div>
						<SocialNavigation className="[&_svg]:size-lh flex items-center gap-4 max-md:justify-center" />
					</div>

					<Navigation />
				</div>

				<div className="text-center">
					<PortableText value={site?.copyright ?? []} />
				</div>
			</div>
		</footer>
	)
}
