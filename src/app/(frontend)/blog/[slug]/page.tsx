import { sanityFetchLive } from '@/sanity/lib/live'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'
import BlogPost from './blog.post'
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
	return (
		<>
			<BlogPost post={post} />
		</>
	)
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>
}): Promise<Metadata> {
	const { slug } = await params
	const post = await getPost(slug)

	return {
		title: post?.metadata?.title,
		description: post?.metadata?.description,
		openGraph: {
			title: post?.metadata?.title,
			description: post?.metadata?.description,
		},
		robots: {
			index: post?.metadata?.noIndex ? false : undefined,
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
		params: { slug },
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
		}
}`
