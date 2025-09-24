'use client'

import { VscSearch } from 'react-icons/vsc'
import { useQueryState } from 'nuqs'
import { handleSearch, useSearchStore } from './store'
import { count, debounce } from '@/lib/utils'
import Loading from '@/ui/loading'
import SearchResults from './search-results'
import GoogleResults from './google-results'
import type { SearchModule } from '@/sanity/types'

export default function ({ scope }: Partial<SearchModule>) {
	const [query, setQuery] = useQueryState('search', { defaultValue: '' })
	const { loading, setLoading, results, setResults } = useSearchStore()

	return (
		<search className="group/search relative">
			<label className="input flex items-center gap-2 py-0">
				<VscSearch className="shrink-0" />

				<input
					id="query"
					className="grow py-[0.25em] outline-none"
					type="search"
					placeholder={scope === 'all' ? 'Search' : `Search ${scope}`}
					defaultValue={query}
					onChange={debounce((e) => {
						setQuery(e.target.value)
						handleSearch({
							scope,
							query: e.target.value,
							setLoading,
							setResults,
						})
					})}
				/>
			</label>

			{query && (
				<output
					htmlFor="query"
					className="anim-fade-to-b group-not-hover/search:group-not-has-[:is(:focus,.results:hover)]/search:hidden absolute inset-x-0 top-full z-1"
				>
					<div className="bg-background mt-2 grid max-h-[10lh] gap-2 overflow-y-auto border p-2">
						{loading ? (
							<Loading>Searching...</Loading>
						) : (
							<>
								<p className="b flex justify-center text-center whitespace-nowrap">
									{count(results, 'result')} found for "
									<span className="overflow-hidden break-all text-ellipsis">
										{query}
									</span>
									"
								</p>

								<SearchResults />
								<GoogleResults scope={scope} />
							</>
						)}
					</div>
				</output>
			)}
		</search>
	)
}
