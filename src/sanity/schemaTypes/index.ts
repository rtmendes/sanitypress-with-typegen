import type { SchemaPluginOptions } from 'sanity'

// documents
import site from './documents/site'
import page from './documents/page'
import navigation from './documents/navigation'
import redirect from './documents/redirect'

// objects
import cta from './objects/cta'
import link from './objects/link'
import linkList from './objects/link.list'
import metadata from './objects/metadata'
import moduleAttributes from './objects/module-attributes'

// modules
import accordionList from './modules/accordion-list'
import customHtml from './modules/custom-html'
import prose from './modules/prose'
import testimonialList from './modules/testimonial-list'

// references
import testimonial from './documents/testimonial'

export const schema: SchemaPluginOptions = {
	types: [
		// documents
		site,
		page,
		navigation,
		redirect,

		// objects
		cta,
		link,
		linkList,
		metadata,
		moduleAttributes,

		// modules
		accordionList,
		customHtml,
		prose,
		testimonialList,

		// references
		testimonial,
	],

	templates: (templates) =>
		templates.filter(({ schemaType }) => !singletonTypes.includes(schemaType)),
}

const singletonTypes = ['site']
