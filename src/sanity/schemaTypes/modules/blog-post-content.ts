import { defineField } from 'sanity'
import { EditIcon } from '@sanity/icons'
import defineModule from '@/sanity/schemaTypes/fragments/define-module'

export default defineModule({
	name: 'blog-post-content',
	title: 'Blog post content',
	type: 'object',
	icon: EditIcon,
	groups: [{ name: 'layout', default: true }],
	fields: [
		defineField({
			name: 'tableOfContents',
			title: 'Table of contents (position)',
			type: 'string',
			options: {
				list: ['left', 'right'],
			},
			group: 'layout',
		}),
	],
	preview: {
		select: {
			uid: 'attributes.uid',
		},
		prepare: ({ uid }) => ({
			title: 'Blog post content',
			subtitle: uid && `#${uid}`,
		}),
	},
})
