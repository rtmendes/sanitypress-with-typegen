import { getSite } from '@/sanity/lib/queries'
import Link from 'next/link'
import Img from './img'
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
					width={100}
					className="inline-block size-auto object-contain"
					alt={site?.title ?? ''}
				/>
			) : (
				site?.title
			)}
		</Link>
	)
}
