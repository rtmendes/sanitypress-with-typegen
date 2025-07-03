import {
	structureTool,
	type StructureBuilder,
	type ListItemBuilder,
	type ListItem,
	type Divider,
} from 'sanity/structure'
import { VscServerProcess } from 'react-icons/vsc'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export default structureTool({
	structure: (S) =>
		S.list()
			.title('Content')
			.items([
				S.divider().title('Global'),
				singleton(S, 'site').icon(VscServerProcess),

				S.divider().title('Pages'),
				S.documentTypeListItem('page').title('All pages'),

				S.divider().title('Blog'),
				S.documentTypeListItem('blog.post').title('All posts'),

				S.divider().title('Navigation'),
				S.documentTypeListItem('navigation'),
				S.documentTypeListItem('redirect').title('Redirects'),

				S.divider().title('References'),
				S.documentTypeListItem('testimonial').title('Testimonials'),
			]),
})

/* helpers */

const singleton = (
	S: StructureBuilder,
	id: string,
	title?: string,
): ListItemBuilder =>
	S.listItem()
		.id(id)
		.title(
			title ||
				id
					.split(/(?=[A-Z])/)
					.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
					.join(' '),
		)
		.child(S.editor().id(id).schemaType(id).documentId(id))

const group = (
	S: StructureBuilder,
	title: string,
	items: (ListItemBuilder | ListItem | Divider)[],
): ListItemBuilder =>
	S.listItem().title(title).child(S.list().title(title).items(items))

const directory = (
	S: StructureBuilder,
	path: string,
	{ maxLevel }: { maxLevel?: number } = {},
) =>
	S.listItem()
		.title(`/${path}`)
		.schemaType('page')
		.child(
			S.documentList()
				.id(`page.${path.replaceAll('/', '-')}`)
				.filter(
					`
						string::startsWith(metadata.slug.current, $path)
						${maxLevel !== undefined ? `&& count(string::split(metadata.slug.current, '/')) <= ${maxLevel + 1}` : ''}
					`,
				)
				.params({ path: path + '/' }),
		)
