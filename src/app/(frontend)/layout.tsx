import { Geist } from 'next/font/google'
import { unstable_ViewTransition as ViewTransition } from 'react'
import Header from '@/ui/header'
import VisualEditing from '@/ui/modules/visual-editing'
import { Analytics } from '@vercel/analytics/next'
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
				<body className="bg-background text-foreground antialiased">
					<Header />
					<main>{children}</main>

					<VisualEditing />
					<Analytics />
				</body>
			</ViewTransition>
		</html>
	)
}
