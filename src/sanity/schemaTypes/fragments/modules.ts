import { defineField } from 'sanity'

export default ({ of = [] }: { of?: Array<{ type: string }> } = {}) =>
	defineField({
		name: 'modules',
		type: 'array',
		of: [
			{ type: 'accordion-list' },
			{ type: 'blog.frontpage' },
			{ type: 'blog-post-list' },
			{ type: 'breadcrumbs' },
			{ type: 'callout' },
			{ type: 'custom-html' },
			{ type: 'hero.split' },
			{ type: 'logo-list' },
			{ type: 'person-list' },
			{ type: 'prose' },
			{ type: 'search-module' },
			{ type: 'stat-list' },
			{ type: 'step-list' },
			{ type: 'testimonial-list' },
			...of,
		],
		options: {
			insertMenu: {
				groups: [
					{
						name: 'blog',
						of: ['blog.frontpage', 'blog-post-content', 'blog-post-list'],
					},
				],
			},
		},
	})
