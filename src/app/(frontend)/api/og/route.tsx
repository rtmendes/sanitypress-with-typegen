import { sanityFetchLive } from '@/sanity/lib/live'
import { groq } from 'next-sanity'
import { ImageResponse } from 'next/og'
import { BLOG_DIR } from '@/lib/env'
import { cn } from '@/lib/utils'
import type { OG_QUERYResult } from '@/sanity/types'

const { hostname } = new URL(process.env.NEXT_PUBLIC_BASE_URL!)
const blogDir = `${BLOG_DIR}/`

const OG_QUERY = groq`*[_type == $type && metadata.slug.current == $slug][0]{
	'title': coalesce(metadata.title, title),
}`

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const slug = searchParams.get('slug') ?? 'index'
	const invert = ['1', 'true'].includes(searchParams.get('invert')!)
	const small = searchParams.get('size') === 'small'

	const type = slug.startsWith(blogDir) ? 'blog.post' : 'page'

	const { title = 'Not found...' } =
		(await sanityFetchLive<OG_QUERYResult>({
			query: OG_QUERY,
			params: {
				type,
				slug: type === 'blog.post' ? slug.replace(blogDir, '') : slug,
			},
		})) ?? {}

	const sanitizedTitle = title
		?.split(/(?:\s*[|-—]\s*)/)!
		.at(0)
		?.trim()
	const text = [...new Set([...sanitizedTitle!, ...hostname])].join('')

	return new ImageResponse(
		(
			<div
				tw={cn(
					'flex h-full w-full flex-col justify-between',
					invert
						? 'bg-neutral-900 text-neutral-100'
						: 'bg-neutral-100 text-neutral-900',
					small ? 'px-12 py-8' : 'px-24 py-16',
				)}
			>
				<h1 tw={cn('leading-snug font-bold', small ? 'text-3xl' : 'text-6xl')}>
					{sanitizedTitle}
				</h1>
				<p tw={cn(small ? 'text-2xl' : 'text-4xl')}>{hostname}</p>
			</div>
		),
		{
			...(small ? { width: 600, height: 338 } : { width: 1200, height: 630 }),
			fonts: [
				{
					name: 'Geist',
					data: await loadGoogleFont('Geist:wght@400', text),
					weight: 400,
					style: 'normal',
				},
				{
					name: 'Geist',
					data: await loadGoogleFont('Geist:wght@700', text),
					weight: 700,
					style: 'normal',
				},
			],
		},
	)
}

async function loadGoogleFont(font: string, text: string) {
	const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`
	const css = await (await fetch(url)).text()
	const regex = /src: url\((?<resource>.+)\) format\('(opentype|truetype)'\)/g
	const { resource } = regex.exec(css)?.groups ?? {}

	if (resource) {
		const response = await fetch(resource)
		if (response.status === 200) {
			return await response.arrayBuffer()
		}
	}

	throw new Error('Failed to load font data')
}
