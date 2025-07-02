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
			name: 'source',
			type: 'array',
			of: [
				{
					type: 'block',
					styles: [{ title: 'Normal', value: 'normal' }],
				},
			],
		}),
	],
	preview: {
		select: {
			quote: 'quote',
			source: 'source',
		},
		prepare: ({ quote, source }) => ({
			title: getBlockText(quote),
			subtitle: getBlockText(source),
		}),
	},
})
