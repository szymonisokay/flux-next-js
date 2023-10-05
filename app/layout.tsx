import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import { ClientOnlyProvider } from '@/components/providers/client-only-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Flux exercises',
	description: 'Level up your gym experience',
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={`${inter.className}`}>
					<Toaster position='top-center' reverseOrder={true} />

					<ClientOnlyProvider>
						<ThemeProvider
							attribute='class'
							defaultTheme='system'
							forcedTheme='light'
							enableSystem
							disableTransitionOnChange
						>
							{children}
						</ThemeProvider>
					</ClientOnlyProvider>
				</body>
			</html>
		</ClerkProvider>
	)
}
