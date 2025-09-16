import { sanityFetchLive } from '@/sanity/lib/live'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'
import ModulesResolver from '@/ui/modules'
import { urlFor } from '@/sanity/lib/image'
import { BLOG_DIR } from '@/lib/env'
import { MODULES_QUERY } from '@/sanity/lib/queries'
import type { Metadata } from 'next'
import type { BLOG_POST_QUERYResult } from '@/sanity/types'

export default async function ({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const post = await getPost(slug)
	if (!post) notFound()

	return <ModulesResolver post={post} />
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>
}): Promise<Metadata> {
	const { slug } = await params
	const post = await getPost(slug)
	const { title, description, image, noIndex } = post?.metadata ?? {}

	return {
		title,
		description: description,
		openGraph: {
			title: title,
			description: description,
			images: image ? [urlFor(image).width(1200).url()] : undefined,
		},
		robots: {
			index: noIndex ? false : undefined,
		},
		alternates: {
			types: {
				'application/rss+xml': `/${BLOG_DIR}/rss.xml`,
			},
		},
	}
}

export async function generateStaticParams() {
	return await client.fetch<{ slug: string }[]>(
		groq`*[_type == 'blog.post' && defined(metadata.slug.current)]{
			'slug': metadata.slug.current
		}`,
	)
}

async function getPost(slug: string) {
	return await sanityFetchLive<BLOG_POST_QUERYResult>({
		query: BLOG_POST_QUERY,
		params: { slug, blogDir: `${BLOG_DIR}/` },
		tags: ['blog-post'],
	})
}

const BLOG_POST_QUERY = groq`*[_type == 'blog.post' && metadata.slug.current == $slug][0]{
	...,
	content[]{
		...,
		_type == 'image' => {
			...,
			asset->
		}
	},
	'headings': content[style in ['h2', 'h3', 'h4', 'h5', 'h6']]{
		style,
		'text': pt::text(@)
	},
	categories[]->{
		title,
		slug
	},
	author->{
		name,
		image{
			...,
			asset->
		}
	},
	'modules': (
		// global modules (before)
		*[_type == 'global-module' && path == '*'].before[]{ ${MODULES_QUERY} }
		// path modules (before)
		+ *[_type == 'global-module' && path == $blogDir].before[]{ ${MODULES_QUERY} }
		// path modules (after)
		+ *[_type == 'global-module' && path == $blogDir].after[]{ ${MODULES_QUERY} }
		// global modules (after)
		+ *[_type == 'global-module' && path == '*'].after[]{ ${MODULES_QUERY} }
	)
}`
