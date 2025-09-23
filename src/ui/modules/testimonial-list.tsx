import { PortableText } from 'next-sanity'
import Img from '@/ui/img'
import type { TestimonialList } from '@/sanity/types'

export default function ({
	intro = [],
	testimonials,
	_key,
}: TestimonialList & { _key: string }) {
	return (
		<section className="section">
			<header className="prose">
				<PortableText value={intro} />
			</header>

			<ul
				className="carousel max-md:full-bleed items-stretch gap-4 pb-2 max-md:px-4 md:mask-r-from-[calc(100%-2rem)] md:pr-4"
				data-anchor-name={`--testimonial-list-${_key}`}
			>
				{testimonials?.map((testimonial: any) => (
					<li
						className="flex flex-col gap-4 md:snap-start"
						key={testimonial._key}
					>
						<blockquote className="prose grow">
							<PortableText value={testimonial.quote} />
						</blockquote>

						{testimonial.author?.name && (
							<cite className="flex items-center gap-2">
								<Img
									className="aspect-square size-[2lh] shrink-0 rounded-full"
									image={testimonial.author?.image}
									alt={testimonial.author?.name}
								/>

								<dl className="">
									<dt>{testimonial.author.name}</dt>
									{testimonial.author?.title && (
										<dd className="text-sm italic">
											{testimonial.author?.title}
										</dd>
									)}
								</dl>
							</cite>
						)}
					</li>
				))}
			</ul>
		</section>
	)
}
