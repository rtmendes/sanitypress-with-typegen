import { defineArrayMember, defineField, defineType } from 'sanity'
import { TfiLayoutGrid2Thumb } from 'react-icons/tfi'
import { count, getBlockText } from '@/lib/utils'

export default defineType({
	name: 'card-list',
	title: 'Card list',
	type: 'object',
	icon: TfiLayoutGrid2Thumb,
	fields: [
		defineField({
			name: 'intro',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'items',
			type: 'array',
			of: [
				defineArrayMember({
					name: 'card',
					type: 'object',
					fieldsets: [{ name: 'asset', options: { columns: 2 } }],
					fields: [
						defineField({
							name: 'image',
							type: 'image',
							options: {
								hotspot: true,
							},
							fieldset: 'asset',
						}),
						defineField({
							name: 'icon',
							type: 'image',
							fieldset: 'asset',
						}),
						defineField({
							name: 'content',
							type: 'array',
							of: [{ type: 'block' }],
						}),
						defineField({
							name: 'ctas',
							title: 'Call-to-actions',
							type: 'array',
							of: [{ type: 'cta' }],
						}),
					],
					preview: {
						select: {
							content: 'content',
							cta: 'ctas.0.link.label',
							image: 'image',
							icon: 'icon',
						},
						prepare: ({ content, cta, image, icon }) => ({
							title: getBlockText(content),
							subtitle: cta,
							media: image || icon,
						}),
					},
				}),
			],
		}),
		defineField({
			name: 'ctas',
			title: 'Call-to-actions',
			type: 'array',
			of: [{ type: 'cta' }],
		}),
	],
	preview: {
		select: {
			intro: 'intro',
			items: 'items',
		},
		prepare: ({ intro, items }) => ({
			title: getBlockText(intro) || count(items, 'card'),
			subtitle: 'Card list',
		}),
	},
})
