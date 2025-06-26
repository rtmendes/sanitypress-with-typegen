import { defineField, defineType } from 'sanity'
import { VscSymbolKeyword } from 'react-icons/vsc'
import { getBlockText } from 'sanitypress-utils'

export default defineType({
	name: 'prose',
	title: 'Prose',
	type: 'object',
	icon: VscSymbolKeyword,
	fields: [
		defineField({
			name: 'content',
			type: 'array',
			of: [
				{ type: 'block' },
				{
					type: 'image',
					options: {
						hotspot: true,
					},
					fields: [
						defineField({
							name: 'alt',
							type: 'string',
						}),
						defineField({
							name: 'figcaption',
							type: 'array',
							of: [
								{
									type: 'block',
									styles: [{ title: 'Normal', value: 'normal' }],
								},
							],
						}),
					],
				},
			],
		}),
		defineField({
			name: 'tableOfContents',
			title: 'Table of contents',
			type: 'string',
			options: {
				list: ['none', 'left', 'right'],
			},
			initialValue: 'none',
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
