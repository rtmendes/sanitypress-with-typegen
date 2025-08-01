import { defineField, defineType } from 'sanity'
import { getBlockText } from '@/lib/utils'
import { VscQuote } from 'react-icons/vsc'

export default defineType({
	name: 'testimonial',
	title: 'Testimonial',
	type: 'document',
	icon: VscQuote,
	fields: [
		defineField({
			name: 'quote',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'author',
			type: 'object',
			options: {
				columns: 2,
			},
			fields: [
				defineField({
					name: 'name',
					type: 'string',
				}),
				defineField({
					name: 'title',
					type: 'string',
				}),
				defineField({
					name: 'image',
					type: 'image',
				}),
			],
		}),
	],
	preview: {
		select: {
			quote: 'quote',
			author: 'author',
		},
		prepare: ({ quote, author }) => ({
			title: getBlockText(quote),
			subtitle: [author?.name, author?.title].filter(Boolean).join(' / '),
			media: author?.image?.asset,
		}),
	},
})
