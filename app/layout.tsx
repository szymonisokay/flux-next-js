import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import getCurrentUser from './actions/getCurrentUser'
import UserMenuModal from './components/modals/UserMenuModal'
import Navbar from './components/navbar/Navbar'
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
			<body className={inter.className}>
				<Toaster position='top-center' reverseOrder={true} />
				<Navbar currentUser={currentUser} />
				<UserMenuModal currentUser={currentUser} />
				{children}
			</body>
		</html>
	)
}
