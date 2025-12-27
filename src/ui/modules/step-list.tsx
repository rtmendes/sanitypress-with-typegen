import { PortableText } from 'next-sanity'
import type { StepList } from '@/sanity/types'
import CTAList from '@/ui/cta-list'

export default function ({ intro = [], ctas, steps }: StepList) {
	return (
		<section className="section grid items-start gap-8 md:grid-cols-2">
			<header className="prose md:sticky-below-header [--offset:1rem]">
				<PortableText value={intro} />
				<CTAList ctas={ctas} />
			</header>

			<ol className="grid gap-8">
				{steps?.map((step) => (
					<li
						className="gap-ch flex items-start [counter-increment:step]"
						key={step._key}
					>
						<span className="h2 bg-foreground text-background size-8 shrink-0 rounded-full text-center before:content-[counter(step)]" />

						<div className="prose">
							<PortableText value={step.content ?? []} />
						</div>
					</li>
				))}
			</ol>
		</section>
	)
}
