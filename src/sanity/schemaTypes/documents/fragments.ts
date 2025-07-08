import { defineArrayMember, defineField } from 'sanity'

export const image = defineArrayMember({
	type: 'image',
	options: {
		hotspot: true,
		metadata: ['lqip'],
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
})
