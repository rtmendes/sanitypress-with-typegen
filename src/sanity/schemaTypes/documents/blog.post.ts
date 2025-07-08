import { defineField, defineType } from 'sanity'
import { VscEdit } from 'react-icons/vsc'
import { image } from './fragments'

export default defineType({
	name: 'blog.post',
	title: 'Blog post',
	type: 'document',
	icon: VscEdit,
	groups: [{ name: 'content', default: true }, { name: 'metadata' }],
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			group: 'content',
		}),
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }, image],
			group: 'content',
		}),
		defineField({
			name: 'publishDate',
			type: 'date',
			group: 'content',
		}),
		defineField({
			name: 'metadata',
			type: 'metadata',
			group: 'metadata',
		}),
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'publishDate',
		},
	},
})
