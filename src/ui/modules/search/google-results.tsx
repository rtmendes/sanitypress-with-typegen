'use client'

import { useQueryState } from 'nuqs'
import { BLOG_DIR } from '@/lib/env'
import type { SearchModule } from '@/sanity/types'

export default function ({ scope }: { scope: SearchModule['scope'] }) {
	const [query] = useQueryState('query')

	const href = [
		`https://www.google.com/search?q=${query} `,
		`site:${process.env.NEXT_PUBLIC_BASE_URL}`,
		scope === 'blog posts' ? `/${BLOG_DIR}` : '',
	].join('')

	return (
		<p className="text-center">
			<a className="link" href={href} target="_blank">
				Search on Google
			</a>
		</p>
	)
}
