import { cn } from '@/lib/utils'
import { getSite } from '@/sanity/lib/queries'
import CTAList from '@/ui/cta-list'
import Logo from '@/ui/logo'
import css from './header.module.css'
import MobileToggle from './mobile-toggle'
import Navigation from './navigation'
import Wrapper from './wrapper'

export default async function () {
	const site = await getSite()

	return (
		<Wrapper className="bg-background/80 max-md:header-open:shadow-xl sticky top-0 z-10 backdrop-blur">
			<div className={cn(css.root, 'section grid items-center gap-x-4 p-4')}>
				<Logo className="[grid-area:logo] max-md:mr-auto [&_img]:-my-2 [&_img]:h-[2lh]" />

				<Navigation />

				<CTAList
					ctas={site?.ctas}
					className="max-md:header-not-open:hidden [grid-area:ctas] *:max-md:w-full"
				/>

				<MobileToggle />
			</div>
		</Wrapper>
	)
}
