import { defineArrayMember, defineField, defineType } from 'sanity'
import { OlistIcon } from '@sanity/icons'
import { count, getBlockText } from '@/lib/utils'

export default defineType({
	name: 'step-list',
	title: 'Step list',
	type: 'object',
	icon: OlistIcon,
	fields: [
		defineField({
			name: 'intro',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'steps',
			type: 'array',
			of: [
				defineArrayMember({
					name: 'step',
					type: 'object',
					fields: [
						defineField({
							name: 'content',
							type: 'array',
							of: [{ type: 'block' }],
						}),
					],
					preview: {
						select: {
							content: 'content',
						},
						prepare: ({ content }) => ({
							title: getBlockText(content),
						}),
					},
				}),
			],
		}),
	],
	preview: {
		select: {
			intro: 'intro',
			steps: 'steps',
		},
		prepare: ({ intro, steps }) => ({
			title: getBlockText(intro) || count(steps, 'step'),
			subtitle: 'Step list',
		}),
	},
})
