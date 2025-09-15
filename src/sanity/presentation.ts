import { presentationTool, defineLocations } from 'sanity/presentation'
import { groq } from 'next-sanity'
import { BLOG_DIR } from '@/lib/env'

export default presentationTool({
	previewUrl: {
		previewMode: {
			enable: '/api/draft-mode/enable',
		},
	},
	resolve: {
		locations: {
			page: defineLocations({
				select: {
					title: 'title',
					slug: 'metadata.slug.current',
				},
				resolve: (doc) => ({
					locations: [
						{
							title: doc?.title,
							href: doc?.slug
								? doc.slug === 'index'
									? '/'
									: `/${doc.slug}`
								: '/',
						},
					],
				}),
			}),
			'blog.post': defineLocations({
				select: {
					title: 'metadata.title',
					slug: 'metadata.slug.current',
				},
				resolve: (doc) => ({
					locations: [
						{
							title: doc?.title,
							href: doc?.slug ? `/${BLOG_DIR}/${doc.slug}` : `/${BLOG_DIR}`,
						},
					],
				}),
			}),
		},
	},
})
