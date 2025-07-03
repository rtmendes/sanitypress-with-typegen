import { defineField, defineType } from 'sanity'
import { VscSymbolKeyword } from 'react-icons/vsc'
import { getBlockText } from '@/lib/utils'
import { image } from '../documents/fragments'

export default defineType({
	name: 'prose',
	title: 'Prose',
	type: 'object',
	icon: VscSymbolKeyword,
	groups: [{ name: 'content', default: true }, { name: 'options' }],
	fields: [
		defineField({
			name: 'attributes',
			type: 'module-attributes',
			group: 'options',
		}),
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }, image],
			group: 'content',
		}),
		defineField({
			name: 'tableOfContents',
			title: 'Table of contents',
			type: 'string',
			options: {
				list: ['left', 'right'],
			},
			group: 'options',
		}),
	],
	preview: {
		select: {
			content: 'content',
		},
		prepare: ({ content }) => ({
			title: getBlockText(content),
			subtitle: 'Prose',
		}),
	},
})
