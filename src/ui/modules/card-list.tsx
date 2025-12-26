import { PortableText } from 'next-sanity'
import type { CardList } from '@/sanity/types'
import CTAList from '@/ui/cta-list'
import Img from '@/ui/img'

export default function ({ intro = [], items, ctas }: CardList) {
	return (
		<section className="section space-y-4">
			{intro && (
				<header className="prose text-center">
					<PortableText value={intro} />
				</header>
			)}

			{items && items.length > 0 && (
				<ul className="grid gap-4 md:grid-cols-[repeat(auto-fill,minmax(var(--container-2xs),1fr))]">
					{items.map((item) => (
						<li key={item._key} className="prose">
							<Img
								className="aspect-video w-full object-cover"
								image={item.image}
								width={400}
								alt=""
							/>

							<Img
								className="h-12 object-cover"
								image={item.icon}
								width={60}
								alt=""
							/>

							<PortableText value={item.content ?? []} />

							<CTAList ctas={item.ctas} />
						</li>
					))}
				</ul>
			)}

			<CTAList ctas={ctas} className="justify-center" />
		</section>
	)
}
