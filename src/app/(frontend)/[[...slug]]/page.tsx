import { sanityFetchLive } from '@/sanity/lib/live'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'
import ModulesResolver from '@/ui/modules'
import { BLOG_DIR } from '@/lib/env'
import { GLOBAL_MODULE_PATH_QUERY, MODULES_QUERY } from '@/sanity/lib/queries'
import type { Metadata } from 'next'
import type { PAGE_QUERYResult } from '@/sanity/types'

export default async function Page({
	params,
}: {
	params: Promise<{ slug?: string[] }>
}) {
	const { slug } = await params
	const page = await getPage(slug)
	if (!page) notFound()

	return <ModulesResolver page={page} />
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug?: string[] }>
}): Promise<Metadata> {
	const { slug } = await params
	const page = await getPage(slug)

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
		alternates: {
			types: {
				'application/rss+xml': `/${BLOG_DIR}/rss.xml`,
			},
		},
	}
}

export async function generateStaticParams() {
	const slugs = await client.fetch<string[]>(
		groq`
			*[
				_type == 'page'
				&& defined(metadata.slug.current)
				&& !(metadata.slug.current in ['404'])
			].metadata.slug.current
		`,
	)

	return slugs.map((slug) => ({
		slug: slug === 'index' ? undefined : slug.split('/'),
	}))
}

async function getPage(slug?: string[]) {
	return await sanityFetchLive<PAGE_QUERYResult>({
		query: PAGE_QUERY,
		params: {
			slug: slug ? slug.join('/') : 'index',
		},
		tags: ['page'],
	})
}

const PAGE_QUERY = groq`
	*[_type == 'page' && metadata.slug.current == $slug][0]{
		...,
		'modules': (
			// global moddules (before)
			*[_type == 'global-module' && path == '*'].before[]{ ${MODULES_QUERY} }
			// path modules (before)
			+ *[_type == 'global-module' && path != '*' && ${GLOBAL_MODULE_PATH_QUERY}].before[]{ ${MODULES_QUERY} }
			// page modules
			+ modules[]{ ${MODULES_QUERY} }
			// path modules (after)
			+ *[_type == 'global-module' && path != '*' && ${GLOBAL_MODULE_PATH_QUERY}].after[]{ ${MODULES_QUERY} }
			// global moddules (after)
			+ *[_type == 'global-module' && path == '*'].after[]{ ${MODULES_QUERY} }
		)
	}
`
