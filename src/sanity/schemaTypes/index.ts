import type { SchemaPluginOptions } from 'sanity'

// documents
import site from './documents/site'
import page from './documents/page'
import navigation from './documents/navigation'
import redirect from './documents/redirect'

// objects
import link from './objects/link'
import linkList from './objects/link.list'
import metadata from './objects/metadata'

// modules
import accordionList from './modules/accordion-list'
import customHtml from './modules/custom-html'
import prose from './modules/prose'

export const schema: SchemaPluginOptions = {
	types: [
		// documents
		site,
		page,
		navigation,
		redirect,

		// objects
		link,
		linkList,
		metadata,

		// modules
		accordionList,
		customHtml,
		prose,
	],

	templates: (templates) =>
		templates.filter(({ schemaType }) => !singletonTypes.includes(schemaType)),
}

const singletonTypes = ['site']
