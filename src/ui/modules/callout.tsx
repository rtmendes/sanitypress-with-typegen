import { PortableText } from 'next-sanity'
import CTAList from '@/ui/cta-list'
import type { Callout } from '@/sanity/types'

export default function ({ intro = [], ctas }: Callout) {
	return (
		<section className="section text-center">
			<header className="prose mx-auto max-w-3xl text-balance">
				<PortableText value={intro} />
				<CTAList ctas={ctas} className="justify-center" />
			</header>
		</section>
	)
}
