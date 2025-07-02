import { getSite } from '@/sanity/lib/queries'
import { PortableText } from 'next-sanity'
import Navigation from './navigation'
import SocialNavigation from '@/ui/social-navigation'

export default async function () {
	const site = await getSite()

	return (
		<footer>
			<div className="section grid gap-4 text-center">
				<SocialNavigation className="[&_svg]:size-lh flex items-center justify-center gap-2" />

				<Navigation />

				<div>
					<PortableText value={site?.copyright ?? []} />
				</div>
			</div>
		</footer>
	)
}
