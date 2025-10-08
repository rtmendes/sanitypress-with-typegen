import { Geist } from 'next/font/google'
// import { ViewTransition } from 'react'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import Header from '@/ui/header'
import Footer from '@/ui/footer'
import VisualEditing from '@/ui/modules/visual-editing'
import { Analytics } from '@vercel/analytics/next'
import { dev } from '@/lib/env'
import type { Metadata } from 'next'
import '@/app.css'

const fontSans = Geist({
	subsets: ['latin'],
})

export const metadata: Metadata = {
	icons: 'https://fav.farm/♣️',
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<NuqsAdapter>
				{/* <ViewTransition> */}
				<head>
					<link rel="preconnect" href="https://cdn.sanity.io" />
					<link rel="preconnect" href="https://ic0n.dev" />
				</head>

				<body className="bg-background text-foreground antialiased">
					<Header />
					<main>{children}</main>
					<Footer />

					<VisualEditing />
					{!dev && <Analytics />}
				</body>
				{/* </ViewTransition> */}
			</NuqsAdapter>
		</html>
	)
}
