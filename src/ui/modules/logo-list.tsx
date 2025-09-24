import { PortableText } from 'next-sanity'
import Img from '@/ui/img'
import { cn } from '@/lib/utils'
import css from './logo-list.module.css'
import type { Logo, LogoList } from '@/sanity/types'

export default function ({
	intro = [],
	logos,
	logoType = 'default',
	autoScroll,
	duration = 12,
}: LogoList) {
	return (
		<section className="section space-y-4 text-center">
			<header className="prose">
				<PortableText value={intro} />
			</header>

			<figure
				className={cn(
					'mx-auto flex items-center gap-y-4',
					autoScroll
						? `${css.track} max-w-max overflow-hidden mask-x-from-[calc(100%-2rem)]`
						: 'flex-wrap justify-center gap-x-4',
				)}
				style={
					{
						'--count': logos?.length,
						'--dur': `${duration}s`,
					} as React.CSSProperties
				}
				key={logos?.length}
			>
				{(logos as Partial<Logo>[])?.map((logo, key) => {
					if (!logo.image) return null

					return (
						<Img
							className="h-[2.5em] w-[200px] shrink-0 object-contain px-4 max-sm:w-[150px]"
							style={{ '--index': key } as React.CSSProperties}
							image={logo.image[logoType] ?? logo.image.default}
							width={400}
							alt={logo.title ?? ''}
							key={key}
						/>
					)
				})}
			</figure>
		</section>
	)
}
