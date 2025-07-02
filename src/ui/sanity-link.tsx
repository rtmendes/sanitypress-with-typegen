import NextLink, { type LinkProps } from 'next/link'
import type { Link, Page } from '@/sanity/types'

export default function ({
	_key,
	_type,
	label,
	type,
	internal,
	external,
	params,
	children,
	...props
}: Omit<Link, 'internal'> & {
	_key: string
	internal?: Omit<Page, 'metadata'> & { slug: string }
} & React.ComponentProps<typeof NextLink>) {
	const linkProps: Omit<LinkProps, 'href'> | React.ComponentProps<'a'> = {
		...props,
		children: children || label || internal?.title || external,
	}

	if (type === 'internal' && internal?.slug)
		return <NextLink href={internal.slug} {...linkProps} />

	if (type === 'external' && external)
		return <NextLink href={external} {...linkProps} />

	return <span {...linkProps} />
}
