import AccordionList from './accordion-list'
import CustomHTML from './custom-html'
import Prose from './prose'
import TestimonialList from './testimonial-list'

import { createDataAttribute, stegaClean } from 'next-sanity'
import type { ModuleAttributes, PAGE_QUERYResult } from '@/sanity/types'

const MODULES_MAP = {
	'accordion-list': AccordionList,
	'custom-html': CustomHTML,
	prose: Prose,
	'testimonial-list': TestimonialList,
} as const

export default function ModulesResolver({ page }: { page: PAGE_QUERYResult }) {
	return (
		<>
			{page?.modules?.map((module) => {
				if (!module) return null

				const Module = MODULES_MAP[
					module._type as keyof typeof MODULES_MAP
				] as React.ComponentType

				return (
					<Module
						{...module}
						data-sanity={createDataAttribute({
							id: page._id,
							type: page._type,
							path: `page[_key == "${module._key}"]`,
						})}
						key={module._key}
					/>
				)
			})}
		</>
	)
}

export type ModuleProps = Partial<
	NonNullable<NonNullable<PAGE_QUERYResult>['modules']>[number]
> & { attributes?: ModuleAttributes }

export function moduleAttributes({ _key, _type, attributes }: ModuleProps) {
	return {
		id: stegaClean(attributes?.uid) || `module-${_key}`,
		'data-module': _type,
		hidden: attributes?.hidden,
	}
}
