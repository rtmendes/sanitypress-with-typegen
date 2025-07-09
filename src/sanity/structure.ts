import { structureTool } from 'sanity/structure'
import { VscServerProcess } from 'react-icons/vsc'
import { singleton } from './lib/builders'

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
				S.documentTypeListItem('person').title('People'),
				S.documentTypeListItem('testimonial').title('Testimonials'),
			]),
})
