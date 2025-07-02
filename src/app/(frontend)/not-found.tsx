import { groq } from 'next-sanity'
import ModulesResolver from '@/ui/modules'
import { MODULES_QUERY } from '@/sanity/lib/queries'
import { sanityFetchLive } from '@/sanity/lib/live'
import type { Metadata } from 'next'

export default async function () {
	const page = await getPage()
	return <ModulesResolver page={page} />
}

export async function generateMetadata(): Promise<Metadata> {
	const page = await getPage()

	return {
		title: page?.metadata?.title,
		description: page?.metadata?.description,
		openGraph: {
			title: page?.metadata?.title,
			description: page?.metadata?.description,
		},
		robots: {
			index: page?.metadata?.noIndex ? false : undefined,
		},
	}
}

async function getPage() {
	// TODO: add type
	return await sanityFetchLive<any>({
		query: NOT_FOUND_QUERY,
	})
}

const NOT_FOUND_QUERY = groq`
	*[_type == 'page' && metadata.slug.current == '404'][0]{
		...,
		modules[]{ ${MODULES_QUERY} }
	}
`
