'use client'

import { SORT_BY_OPTIONS, useBlogFrontpageStore } from './store'

export default function () {
	const { setSortBy } = useBlogFrontpageStore()

	return (
		<label>
			<span>Sort by:</span>
			<select onChange={(e) => setSortBy(e.target.value as any)}>
				{SORT_BY_OPTIONS.map((option) => (
					<option value={option.value} key={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</label>
	)
}
