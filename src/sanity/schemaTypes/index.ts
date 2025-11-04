import type { SchemaPluginOptions } from 'sanity'
// documents
import blogCategory from './documents/blog.category'
import blogPost from './documents/blog.post'
import globalModule from './documents/global-module'
import logo from './documents/logo'
import navigation from './documents/navigation'
import page from './documents/page'
import person from './documents/person'
import redirect from './documents/redirect'
import site from './documents/site'
import testimonial from './documents/testimonial'
// modules
import accordionList from './modules/accordion-list'
import blogPostContent from './modules/blog-post-content'
import blogPostList from './modules/blog-post-list'
import blogFrontpage from './modules/blog.frontpage'
import breadcrumbs from './modules/breadcrumbs'
import callout from './modules/callout'
import customHtml from './modules/custom-html'
import heroSplit from './modules/hero.split'
import logoList from './modules/logo-list'
import personList from './modules/person-list'
import prose from './modules/prose'
import searchModule from './modules/search-module'
import statList from './modules/stat-list'
import testimonialList from './modules/testimonial-list'
// objects
import cta from './objects/cta'
import link from './objects/link'
import linkList from './objects/link.list'
import metadata from './objects/metadata'
import moduleAttributes from './objects/module-attributes'

export const schema: SchemaPluginOptions = {
	types: [
		// documents
		site,
		page,
		globalModule,
		blogPost,
		redirect,

		// references
		blogCategory,
		logo,
		navigation,
		person,
		testimonial,

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
		breadcrumbs,
		callout,
		customHtml,
		heroSplit,
		logoList,
		personList,
		prose,
		searchModule,
		statList,
		testimonialList,
	],

	templates: (templates) =>
		templates.filter(({ schemaType }) => !singletonTypes.includes(schemaType)),
}

const singletonTypes = ['site']
