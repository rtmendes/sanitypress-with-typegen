import { defineArrayMember, defineField, defineType } from 'sanity'
import { FeedbackIcon } from '@sanity/icons'
import { getBlockText } from '@/lib/utils'

export default defineType({
	name: 'testimonial-list',
	title: 'Testimonial list',
	type: 'object',
	icon: FeedbackIcon,
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
