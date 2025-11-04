import { PortableText } from 'next-sanity'
import type { AccordionList } from '@/sanity/types'

export default function ({
	_key: _module_key,
	intro,
	accordions,
	exclusive,
	enableSchema,
}: AccordionList & { _key: string }) {
	return (
		<section
			className="section space-y-4"
			{...(enableSchema && {
				itemScope: true,
				itemType: 'https://schema.org/FAQPage',
			})}
		>
			{intro && (
				<header className="prose">
					<PortableText value={intro} />
				</header>
			)}

			<div>
				{accordions?.map(({ _key, summary, content, open }) => (
					<details
						className="accordion border-stroke not-last:border-b"
						name={exclusive ? _module_key : undefined}
						open={open}
						{...(enableSchema && {
							itemScope: true,
							itemProp: 'mainEntity',
							itemType: 'https://schema.org/Question',
						})}
						key={_key}
					>
						<summary
							className="py-2 font-bold"
							{...(enableSchema && { itemProp: 'name' })}
						>
							{summary}
						</summary>

						<div
							className="not-supports-[interpolate-size:allow-keywords]:anim-fade-to-b pb-lh"
							{...(enableSchema && {
								itemScope: true,
								itemProp: 'acceptedAnswer',
								itemType: 'https://schema.org/Answer',
							})}
						>
							<div
								className="prose"
								{...(enableSchema && { itemProp: 'text' })}
							>
								<PortableText value={content ?? []} />
							</div>
						</div>
					</details>
				))}
			</div>
		</section>
	)
}
