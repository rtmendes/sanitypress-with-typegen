import { defineField, defineType } from 'sanity'
import { VscEdit } from 'react-icons/vsc'
import { getBlockText } from '@/lib/utils'

export default defineType({
	name: 'blog.frontpage',
	title: 'Blog (frontpage)',
	type: 'object',
	icon: VscEdit,
	fields: [
		defineField({
			name: 'intro',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'postsPerPage',
			type: 'number',
			initialValue: 6,
			validation: (Rule) => Rule.min(1),
		}),
	],
	preview: {
		select: {
			intro: 'intro',
		},
		prepare: ({ intro }) => ({
			title: getBlockText(intro),
			subtitle: 'Blog (frontpage)',
		}),
	},
})
