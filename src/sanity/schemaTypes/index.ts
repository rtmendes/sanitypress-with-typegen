import type { SchemaPluginOptions } from 'sanity'

// documents
import site from './documents/site'
import page from './documents/page'
import globalModule from './documents/global-module'
import blogPost from './documents/blog.post'
import blogCategory from './documents/blog.category'
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
import blogFrontpage from './modules/blog.frontpage'
import blogPostContent from './modules/blog-post-content'
import blogPostList from './modules/blog-post-list'
import customHtml from './modules/custom-html'
import heroSplit from './modules/hero.split'
import logoList from './modules/logo-list'
import prose from './modules/prose'
import testimonialList from './modules/testimonial-list'

// references
import logo from './documents/logo'
import person from './documents/person'
import testimonial from './documents/testimonial'

export const schema: SchemaPluginOptions = {
	types: [
		// documents
		site,
		page,
		globalModule,
		blogPost,
		blogCategory,
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
		blogFrontpage,
		blogPostContent,
		blogPostList,
		customHtml,
		heroSplit,
		logoList,
		prose,
		testimonialList,

		// references
		logo,
		person,
		testimonial,
	],

	templates: (templates) =>
		templates.filter(({ schemaType }) => !singletonTypes.includes(schemaType)),
}

const singletonTypes = ['site']
