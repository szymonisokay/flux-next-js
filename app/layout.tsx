import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import { ClientOnlyProvider } from '@/components/providers/client-only-provider'
import { ModalsProvider } from '@/components/providers/modals-provider'
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
		<ClerkProvider
			appearance={{
				elements: {
					card: 'p-4 pt-6 bg-accent gap-4 rounded-md',
					main: 'gap-4',
					headerTitle:
						'text-lg font-semibold tracking-tight leading-none text-primary',
					headerSubtitle: 'text-sm text-secondary',
					socialButtonsBlockButton:
						'bg-background text-secondary hover:text-primary hover:bg-background duration-200',
					dividerLine: 'bg-secondary',
					dividerText: 'text-secondary',
					formFieldLabel: 'text-primary',
					formFieldInput: 'bg-background text-primary',
					formButtonPrimary: 'bg-primary-color',
					footer: 'justify-center',
					footerActionText: 'text-secondary',
					footerActionLink:
						'text-primary-color hover:text-primary-color',
				},
			}}
		>
			<html lang='en'>
				<body className={`${inter.className}`}>
					<Toaster position='top-center' reverseOrder={true} />

					<ClientOnlyProvider>
						<ModalsProvider />
						<ThemeProvider
							attribute='class'
							defaultTheme='system'
							forcedTheme='dark'
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
