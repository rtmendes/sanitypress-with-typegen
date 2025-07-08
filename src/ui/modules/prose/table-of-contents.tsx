import TocItem from './toc-item'

export default function ({
	headings,
	...props
}: {
	headings: Array<{
		style: string | null
		text: string | null
	}> | null
} & React.ComponentProps<'details'>) {
	return (
		<details {...props}>
			<summary>Table of Contents</summary>

			<ol>
				{headings?.map((heading, key) => (
					<TocItem heading={heading} key={key} />
				))}
			</ol>
		</details>
	)
}
