import { defineField, defineType } from 'sanity'
import { VscEdit } from 'react-icons/vsc'

export default defineType({
	name: 'blog-post-content',
	title: 'Blog post content',
	type: 'object',
	icon: VscEdit,
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
