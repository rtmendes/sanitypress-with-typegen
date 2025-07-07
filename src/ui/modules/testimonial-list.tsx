import { PortableText } from 'next-sanity'

export default function ({ intro, testimonials }: Partial<any>) {
	return (
		<section className="section">
			<header className="prose">
				<PortableText value={intro} />
			</header>

			<ul className="carousel max-md:full-bleed gap-4 max-md:px-4 md:mask-r-from-[calc(100%-2rem)] md:pr-4">
				{testimonials?.map((testimonial: any) => (
					<li
						className="flex flex-col gap-4 md:snap-start"
						key={testimonial._key}
					>
						<blockquote className="prose">
							<PortableText value={testimonial.quote} />
						</blockquote>

						<cite className="mt-auto">
							<PortableText value={testimonial.source} />
						</cite>
					</li>
				))}
			</ul>
		</section>
	)
}
