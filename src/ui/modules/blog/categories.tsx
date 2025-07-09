import { cn } from '@/lib/utils'
import type { BlogCategory } from '@/sanity/types'

export default function ({
	categories,
	className,
}: { categories: BlogCategory[] } & React.ComponentProps<'ul'>) {
	if (!categories) return null

	return (
		<ul className={cn('flex flex-wrap gap-x-[.5ch] p-0', className)}>
			{categories.map((category, i) => (
				<li className="shrink-0" key={category._id}>
					{category.title}
					{i < categories.length - 1 && <>, </>}
				</li>
			))}
		</ul>
	)
}
