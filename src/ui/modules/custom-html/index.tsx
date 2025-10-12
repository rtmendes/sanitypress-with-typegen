import { stegaClean } from 'next-sanity'
import CSS from './css'
import WithScript from './with-script'
import type { CustomHtml } from '@/sanity/types'

export default function ({ className, html, css }: CustomHtml) {
	if (!html?.code && !css?.code) return null

	return (
		<>
			<CSS code={stegaClean(css?.code)} />

			{html?.code &&
				(html.code.includes('<script') ? (
					<WithScript
						code={stegaClean(html.code)}
						className={stegaClean(className)}
					/>
				) : (
					<div
						className={stegaClean(className)}
						dangerouslySetInnerHTML={{ __html: stegaClean(html.code) }}
					/>
				))}
		</>
	)
}
