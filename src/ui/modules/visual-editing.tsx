import { draftMode } from 'next/headers'
import { SanityLive } from '@/sanity/lib/live'
import { VisualEditing } from 'next-sanity'

export default async function () {
	return (
		<>
			<SanityLive />

			{(await draftMode()).isEnabled && (
				<>
					<VisualEditing />

					<details className="fixed right-0 bottom-0 bg-amber-200/60 backdrop-blur-xs">
						<summary>🚧 Draft mode</summary>

						<menu>
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
