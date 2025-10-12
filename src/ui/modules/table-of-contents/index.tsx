import ToCItem from './toc-item'
import { cn } from '@/lib/utils'

export default function ({
	headings,
	className,
	...props
}: {
	headings: Array<{
		style: string | null
		text: string | null
	}> | null
} & React.ComponentProps<'details'>) {
	return (
		<details className={cn('accordion', className)} {...props}>
			<summary className="font-bold md:after:content-['']!">
				Table of Contents
			</summary>

			<ol className="border-stroke pl-ch border-l">
				{headings?.map((heading, key) => (
					<ToCItem heading={heading} key={key} />
				))}
			</ol>
		</details>
	)
}
