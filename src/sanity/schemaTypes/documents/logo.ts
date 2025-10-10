import { defineField, defineType } from 'sanity'
import { VscSymbolMisc } from 'react-icons/vsc'

export default defineType({
	name: 'logo',
	title: 'Logo',
	type: 'document',
	icon: VscSymbolMisc,
	fields: [
		defineField({
			name: 'title',
			type: 'string',
		}),
		defineField({
			name: 'image',
			type: 'object',
			options: {
				columns: 3,
			},
			fields: [
				defineField({
					name: 'default',
					type: 'image',
				}),
				defineField({
					name: 'light',
					description: 'On dark backgrounds',
					type: 'image',
				}),
				defineField({
					name: 'dark',
					description: 'On light backgrounds',
					type: 'image',
				}),
			],
		}),
	],
	preview: {
		select: {
			title: 'title',
			media: 'image.default',
		},
	},
})
