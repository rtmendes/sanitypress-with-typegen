import { moduleAttributes } from '.'
import { PortableText } from 'next-sanity'
import CTAList from '@/ui/cta-list'
import Img from '@/ui/img'
import { cn } from '@/lib/utils'
import type { HeroSplit } from '@/sanity/types'

export default function ({ content = [], ctas, image, ...props }: HeroSplit) {
	return (
		<section
			className="section grid items-center gap-4 md:grid-cols-2"
			{...moduleAttributes(props)}
		>
			<figure
				className={cn(
					image?.onRight && 'md:order-last',
					image?.afterContent && 'max-md:order-last',
				)}
			>
				<Img image={image} alt={image?.alt ?? ''} />
			</figure>

			<header className="prose">
				<PortableText value={content} />
				<CTAList ctas={ctas} />
			</header>
		</section>
	)
}
