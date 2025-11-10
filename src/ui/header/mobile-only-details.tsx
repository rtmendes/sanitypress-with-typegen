'use client'

import { useIsDesktop } from '@/hooks/useMatchMedia'

/**
 * @description - Details functionality that works only on mobile
 */
export default function ({ name, ...props }: React.ComponentProps<'details'>) {
	const isDesktop = useIsDesktop()

	const detailsProps: React.ComponentProps<'details'> = isDesktop
		? {
				open: true,
				onClick: (e) => e.preventDefault(),
			}
		: { name }

	return <details {...props} {...detailsProps} />
}
