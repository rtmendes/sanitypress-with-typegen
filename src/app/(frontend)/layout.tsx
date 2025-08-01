import { Geist } from 'next/font/google'
import { unstable_ViewTransition as ViewTransition } from 'react'
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
			<ViewTransition>
				<NuqsAdapter>
					<body className="bg-background text-foreground antialiased">
						<Header />
						<main>{children}</main>
						<Footer />

						<VisualEditing />
						{!dev && <Analytics />}
					</body>
				</NuqsAdapter>
			</ViewTransition>
		</html>
	)
}
