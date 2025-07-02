import { getSite } from '@/sanity/lib/queries'
import Wrapper from './wrapper'
import Link from 'next/link'
import Navigation from './navigation'
import CTAList from '@/ui/cta-list'
import MobileToggle from './mobile-toggle'
import { cn } from '@/lib/utils'
import css from './header.module.css'

export default async function () {
	const site = await getSite()

	return (
		<Wrapper className="bg-background/50 sticky top-0 z-10 backdrop-blur">
			<div className={cn(css.root, 'section grid items-center gap-x-4 p-4')}>
				<Link href="/" className="[grid-area:logo]">
					{site?.title}
				</Link>

				<Navigation />
				<CTAList
					// TODO: fix this when Sanity TypeGen issue is resolved
					// @ts-ignore
					ctas={site?.ctas}
					className="max-md:header-not-open:hidden [grid-area:ctas]"
				/>

				<MobileToggle />
			</div>
		</Wrapper>
	)
}
