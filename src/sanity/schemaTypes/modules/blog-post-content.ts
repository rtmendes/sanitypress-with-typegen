import { defineField, defineType } from 'sanity'
import { EditIcon } from '@sanity/icons'

export default defineType({
	name: 'blog-post-content',
	title: 'Blog post content',
	type: 'object',
	icon: EditIcon,
	fields: [
		defineField({
			name: 'attributes',
			title: 'Module attributes',
			type: 'module-attributes',
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
