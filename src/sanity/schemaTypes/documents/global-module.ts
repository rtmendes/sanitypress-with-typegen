import { defineArrayMember, defineField, defineType } from 'sanity'
import { VscInsert } from 'react-icons/vsc'
import modules from '../fragments/modules'
import { count } from '@/lib/utils'

export default defineType({
	name: 'global-module',
	title: 'Global module',
	type: 'document',
	icon: VscInsert,
	fieldsets: [
		{
			name: 'path',
			options: { columns: 2 },
			description:
				'Use * for all pages. A trailing slash (/) excludes the parent path.',
		},
	],
	fields: [
		defineField({
			name: 'path',
			title: 'Target path',
			type: 'string',
			placeholder: 'e.g. *, foo/bar, blog/, etc.',
			validation: (Rule) => Rule.regex(/^(\*|[a-z0-9-_/]+\/?)$/),
			fieldset: 'path',
		}),
		defineField({
			name: 'ignorePaths',
			title: 'Paths to ignore',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'string',
					placeholder: 'e.g. foo/bar, blog/, etc.',
					validation: (Rule) => Rule.required(),
				}),
			],
			fieldset: 'path',
		}),
		defineField({
			...modules,
			name: 'before',
			description: 'Added before the page content',
		}),
		defineField({
			...modules,
			name: 'after',
			description: 'Added after the page content',
		}),
	],
	preview: {
		select: {
			path: 'path',
			before: 'before',
			after: 'after',
		},
		prepare: ({ path, before, after }) => ({
			title: count([...(before ?? []), ...(after ?? [])], 'module'),
			subtitle: path === '*' ? '* (All pages)' : path,
		}),
	},
})
