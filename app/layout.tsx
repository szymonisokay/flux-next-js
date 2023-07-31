import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import getCurrentUser from '@/actions/getCurrentUser'
import { Sidebar } from '@/components/custom/sidebar'
import Navbar from '@/components/navbar/Navbar'
import ModalProvider from '@/providers/ModalProvider'
import WorkoutProvider from '@/providers/WorkoutProvider'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Flux',
	description: 'Level up your gym experience',
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const currentUser = await getCurrentUser()

	return (
		<html lang='en'>
			<body className={`${inter.className}`}>
				<Toaster position='top-center' reverseOrder={true} />
				<Navbar currentUser={currentUser} />
				<Sidebar />
				<ModalProvider currentUser={currentUser}>
					<WorkoutProvider>{children}</WorkoutProvider>
				</ModalProvider>
			</body>
		</html>
	)
}
