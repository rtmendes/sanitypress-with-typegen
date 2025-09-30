import { moduleAttributes } from '..'
import TableOfContents from './table-of-contents'
import { PortableText, stegaClean } from 'next-sanity'
import AnchoredHeading from './anchored-heading'
import { cn } from '@/lib/utils'
import type { Prose } from '@/sanity/types'

import Image from './image'
import CustomHTML from '@/ui/modules/custom-html'

export default function ({
	content,
	tableOfContents,
	headings,
	...props
}: Prose & React.ComponentProps<typeof TableOfContents>) {
	const toc = stegaClean(tableOfContents)

	return (
		<section
			className={cn(
				'section',
				toc && 'flex gap-4 max-md:flex-col md:items-start',
			)}
			{...moduleAttributes(props)}
		>
			{(toc === 'left' || toc === 'right') && (
				<TableOfContents
					headings={headings}
					className={cn(
						'top-(--header-height) shrink-0 md:sticky md:w-[20ch]',
						toc === 'right' && 'md:order-last',
					)}
					open
				/>
			)}

			<article className="prose">
				<PortableText
					value={content ?? []}
					components={{
						block: {
							h1: (node) => <AnchoredHeading as="h1" {...node} />,
							h2: (node) => <AnchoredHeading as="h2" {...node} />,
							h3: (node) => <AnchoredHeading as="h3" {...node} />,
							h4: (node) => <AnchoredHeading as="h4" {...node} />,
							h5: (node) => <AnchoredHeading as="h5" {...node} />,
							h6: (node) => <AnchoredHeading as="h6" {...node} />,
						},
						types: {
							image: Image,
							'custom-html': ({ value }) => <CustomHTML {...value} />,
						},
					}}
				/>
			</article>
		</section>
	)
}
