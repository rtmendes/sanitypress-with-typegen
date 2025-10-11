import { getSite } from '@/sanity/lib/queries'
import Img from './img'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default async function ({
	style = 'default',
	className,
}: {
	style?: 'default' | 'light' | 'dark'
	className?: string
}) {
	const site = await getSite()
	const logo = site?.logo?.image?.[style]

	return (
		<Link
			href="/"
			className={cn('text-foreground inline-block font-bold', className)}
		>
			{logo ? (
				<Img
					image={logo}
					className="inline-block size-auto object-contain"
					alt={site?.title ?? ''}
				/>
			) : (
				site?.title
			)}
		</Link>
	)
}
