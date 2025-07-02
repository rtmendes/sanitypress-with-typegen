import { defineArrayMember, defineField, defineType } from 'sanity'
import { getBlockText } from '@/lib/utils'
import { VscQuote } from 'react-icons/vsc'

export default defineType({
	name: 'testimonial-list',
	title: 'Testimonial list',
	type: 'object',
	icon: VscQuote,
	fields: [
		defineField({
			name: 'intro',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'testimonials',
			type: 'array',
			of: [
				{ type: 'testimonial' },
				{ type: 'reference', to: [{ type: 'testimonial' }] },
			],
		}),
	],
	preview: {
		select: {
			intro: 'intro',
		},
		prepare: ({ intro }) => ({
			title: getBlockText(intro),
			subtitle: 'Testimonial list',
		}),
	},
})
