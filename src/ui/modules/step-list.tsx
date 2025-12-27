import { PortableText } from 'next-sanity'
import type { StepList } from '@/sanity/types'

export default function ({ intro = [], steps }: StepList) {
	return (
		<section className="section grid items-start gap-8 md:grid-cols-2">
			{intro && (
				<header className="prose md:sticky-below-header [--offset:1rem]">
					<PortableText value={intro} />
				</header>
			)}

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
