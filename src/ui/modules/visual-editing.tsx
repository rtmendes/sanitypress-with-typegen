import { draftMode } from 'next/headers'
import { SanityLive } from '@/sanity/lib/live'
import { VisualEditing } from 'next-sanity/visual-editing'

export default async function () {
	return (
		<>
			<SanityLive />

			{(await draftMode()).isEnabled && (
				<>
					<VisualEditing />

					<details className="fixed right-0 bottom-0 bg-amber-200/60 backdrop-blur-xs">
						<summary className="p-2">🚧 Draft mode</summary>

						<menu className="p-2 pt-0">
							<li>
								<a href="/api/draft-mode/disable" className="link">
									Disable draft mode
								</a>
							</li>
							<li>
								<a href="/admin" className="link">
									Open studio
								</a>
							</li>
						</menu>
					</details>
				</>
			)}
		</>
	)
}
