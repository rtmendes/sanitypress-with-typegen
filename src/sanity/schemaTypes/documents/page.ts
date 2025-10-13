import { defineField, defineType } from 'sanity'
import { VscEyeClosed } from 'react-icons/vsc'
import { HomeIcon, EditIcon, SearchIcon, ErrorScreenIcon } from '@sanity/icons'
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
				(slug === 'index' && HomeIcon) ||
				(slug === '404' && ErrorScreenIcon) ||
				(slug === 'search' && SearchIcon) ||
				(slug === 'blog' && EditIcon) ||
				(noIndex && VscEyeClosed),
		}),
	},
})
