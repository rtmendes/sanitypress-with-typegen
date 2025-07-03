import NextLink, { type LinkProps } from 'next/link'
import type { Link, Page } from '@/sanity/types'

type SanityLink = Omit<Link, 'internal'> & {
	_key: string
	internal?: Omit<Page, 'metadata'> & { slug: string }
}

export default function ({
	children,
	...props
}: (SanityLink | any) & React.ComponentProps<typeof NextLink>) {
	const { _key, _type, label, type, internal, external, params } =
		props as SanityLink

	const linkProps: Omit<LinkProps, 'href'> | React.ComponentProps<'a'> = {
		...props,
		children: children || label || internal?.title || external,
	}

	if (type === 'internal' && internal?.slug)
		return (
			<NextLink
				href={[internal.slug, params].filter(Boolean).join('')}
				{...linkProps}
			/>
		)

	if (type === 'external' && external)
		return <NextLink href={external} {...linkProps} />

	return <span {...linkProps} />
}
