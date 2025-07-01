import { getSite } from '@/sanity/lib/queries'
import { PortableText } from 'next-sanity'

export default async function () {
	const site = await getSite()

	return (
		<footer>
			<div className="section text-center">
				<PortableText value={site?.copyright ?? []} />
			</div>
		</footer>
	)
}
