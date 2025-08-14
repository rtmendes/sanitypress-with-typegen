import { codeToHtml, splitLines, bundledThemes } from 'shiki'
import ClickToCopy from '@/ui/click-to-copy'
import { stegaClean } from 'next-sanity'
import { cn } from '@/lib/utils'
import css from './code.module.css'
import type { ComponentProps } from 'react'
import type { Code } from '@/sanity/types'

export default async function ({
	value,
	theme = 'dark-plus',
	className,
}: {
	theme?: keyof typeof bundledThemes
	value?: Code
} & ComponentProps<'article'>) {
	if (!value?.code) return null

	const html = await codeToHtml(stegaClean(value.code), {
		lang: value.language as any,
		theme,
		decorations: value.highlightedLines
			?.map((row) => ({
				row,
				characters: stegaClean(splitLines(value.code!)[row - 1]?.[0])?.length,
			}))
			?.filter(({ characters }) => characters > 0)
			?.map(({ row, characters }) => ({
				start: { line: row - 1, character: 0 },
				end: { line: row - 1, character: characters },
				properties: { class: 'highlight' },
			})),
	})

	const [path, filename] = value.filename?.includes('/')
		? value.filename.split(/(.*)\/(.*)$/).filter(Boolean)
		: [, value.filename]

	return (
		<article
			className={cn(
				'group bg-foreground/5 relative overflow-hidden rounded',
				className,
			)}
			data-module="code"
		>
			{value.filename && (
				<menu className="text-background sticky top-0 z-1 -mb-1 flex items-center overflow-x-auto rounded-t bg-[#323232] p-1 pb-0">
					<li className="inline-block rounded-t border-b border-blue-400 bg-[#1E1E1E] px-3 py-2 font-mono text-sm">
						{path && <span className="text-background/50">{path}/</span>}
						<span>{filename}</span>
					</li>
					<li className="ml-auto">
						<ClickToCopy
							value={stegaClean(value.code)}
							className={cn(
								'min-h-lh px-2 text-lg not-hover:opacity-50 [&.copied]:opacity-100',
								!theme.includes('light') && 'text-white',
							)}
						/>
					</li>
				</menu>
			)}

			<div
				className={cn(
					css.code,
					'[--highlight-color:var(--color-green-400)] *:p-4',
				)}
				dangerouslySetInnerHTML={{ __html: html }}
			/>
		</article>
	)
}
