import { getSite } from '@/sanity/lib/queries'
import Wrapper from './wrapper'
import Link from 'next/link'
import Navigation from './navigation'

export default async function () {
	const site = await getSite()

	return (
		<Wrapper className="bg-background sticky top-0 z-10">
			<div className="section flex gap-4 py-0">
				<Link href="/">{site?.title}</Link>
				<Navigation navigation={site?.header} />
			</div>
		</Wrapper>
	)
}
