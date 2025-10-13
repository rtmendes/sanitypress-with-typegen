import React, { useEffect, useState } from 'react'
import { useClient } from 'sanity'
import { groq } from 'next-sanity'
import { Card, Stack, Text, Flex, Button } from '@sanity/ui'
import { useRouter } from 'sanity/router'

interface FolderData {
	folder: string
	count: number
}

export default function DynamicPageFolders() {
	const client = useClient()
	const router = useRouter()
	const [folders, setFolders] = useState<FolderData[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchFolders = async () => {
			try {
				const pages = await client.fetch(groq`
					*[_type == "page" && metadata.slug.current match "*/*"]{
						"slug": metadata.slug.current
					}
				`)

				const folderMap = new Map<string, number>()

				pages.forEach((page: { slug: string }) => {
					if (page.slug && page.slug.includes('/')) {
						const folder = page.slug.split('/')[0]
						folderMap.set(folder, (folderMap.get(folder) || 0) + 1)
					}
				})

				const folderData = Array.from(folderMap.entries())
					.map(([folder, count]) => ({ folder, count }))
					.sort((a, b) => a.folder.localeCompare(b.folder))

				setFolders(folderData)
			} catch (error) {
				console.error('Error fetching folders:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchFolders()
	}, [client])

	const navigateToFolder = (folder: string) => {
		router.navigateIntent('edit', {
			id: `folder-${folder}`,
			type: 'page',
			template: 'page',
		})
	}

	if (loading) {
		return (
			<Card padding={4}>
				<Text>Loading folders...</Text>
			</Card>
		)
	}

	if (folders.length === 0) {
		return (
			<Card padding={4}>
				<Text>
					No folders found. Create pages with slugs like "docs/getting-started"
					to see folders here.
				</Text>
			</Card>
		)
	}

	return (
		<Card padding={4}>
			<Stack space={3}>
				<Text size={2} weight="semibold">
					Page Folders
				</Text>
				{folders.map(({ folder, count }) => (
					<Card key={folder} padding={3} border radius={2} tone="default">
						<Flex justify="space-between" align="center">
							<Text size={1}>
								<strong>/{folder}</strong> ({count} page{count !== 1 ? 's' : ''}
								)
							</Text>
							<Button
								text="View"
								tone="primary"
								mode="ghost"
								onClick={() => navigateToFolder(folder)}
							/>
						</Flex>
					</Card>
				))}
			</Stack>
		</Card>
	)
}
