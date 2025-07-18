import { defineField, defineType } from 'sanity'
import {
	VscHome,
	VscQuestion,
	VscSearch,
	VscEdit,
	VscEyeClosed,
} from 'react-icons/vsc'
import modules from '../fragments/modules'

export default defineType({
	name: 'page',
	title: 'Page',
	type: 'document',
	groups: [{ name: 'content', default: true }, { name: 'metadata' }],
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			group: 'content',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			...modules,
			group: 'content',
		}),
		defineField({
			name: 'metadata',
			type: 'metadata',
			group: 'metadata',
		}),
	],
	preview: {
		select: {
			title: 'title',
			slug: 'metadata.slug.current',
			noIndex: 'metadata.noIndex',
		},
		prepare: ({ title, slug, noIndex }) => ({
			title,
			subtitle: `/${slug === 'index' ? '' : slug}`,
			media:
				(slug === 'index' && VscHome) ||
				(slug === '404' && VscQuestion) ||
				(slug === 'search' && VscSearch) ||
				(slug === 'blog' && VscEdit) ||
				(noIndex && VscEyeClosed),
		}),
	},
})
