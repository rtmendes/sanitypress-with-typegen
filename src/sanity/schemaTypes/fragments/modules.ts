import { defineField } from 'sanity'

export default defineField({
	name: 'modules',
	type: 'array',
	of: [
		{ type: 'accordion-list' },
		{ type: 'blog.frontpage' },
		{ type: 'blog-post-content' },
		{ type: 'blog-post-list' },
		{ type: 'custom-html' },
		{ type: 'logo-list' },
		{ type: 'prose' },
		{ type: 'testimonial-list' },
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
