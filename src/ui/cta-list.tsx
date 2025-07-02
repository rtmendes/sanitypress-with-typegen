import SanityLink from './sanity-link'
import { stegaClean } from 'next-sanity'
import { cn } from '@/lib/utils'

export default function ({
	ctas,
	className,
}: { ctas?: any[] } & React.ComponentProps<'div'>) {
	if (!ctas?.length) return null

	return (
		<div
			className={cn(
				'flex flex-wrap items-center gap-x-[.5em] gap-y-[.25em]',
				className,
			)}
		>
			{ctas.map((cta) => (
				<SanityLink
					className={stegaClean(cta.style)}
					{...(cta.link as unknown as React.ComponentProps<typeof SanityLink>)}
				/>
			))}
		</div>
	)
}
