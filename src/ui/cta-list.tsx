import SanityLink from './sanity-link'
import { stegaClean } from 'next-sanity'
import { cn } from '@/lib/utils'
import type { Cta } from '@/sanity/types'

export default function ({
	ctas,
	className,
}: { ctas?: Cta[] | any } & React.ComponentProps<'div'>) {
	if (!ctas?.length) return null

	return (
		<div
			className={cn(
				'flex flex-wrap items-center gap-x-[.5em] gap-y-[.25em]',
				className,
			)}
		>
			{ctas.map((cta: Cta) => (
				<SanityLink className={stegaClean(cta.style)} {...cta.link} />
			))}
		</div>
	)
}
