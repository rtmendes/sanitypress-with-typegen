import { PortableText, stegaClean } from 'next-sanity'
import { Suspense } from 'react'
import SearchForm from './search-form'
import Loading from '@/ui/loading'
import type { SearchModule } from '@/sanity/types'

export default function ({ intro = [], scope }: SearchModule) {
	return (
		<section className="section max-w-2xl space-y-4">
			<header className="prose text-center">
				<PortableText value={intro} />
			</header>

			<Suspense fallback={<Loading>Loading search...</Loading>}>
				<SearchForm scope={stegaClean(scope)} />
			</Suspense>
		</section>
	)
}
