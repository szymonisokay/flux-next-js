'use client'

import { User } from '@prisma/client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useSidebar from '../../hooks/use-sidebar'
import { Icons } from '../icons'
import { Button } from '../ui/button'
import UserInfo from './UserInfo'

interface NavbarProps {
	currentUser?: User | null
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
	const sidebar = useSidebar()
	const pathname = usePathname()
	const router = useRouter()

	const isOnAuthPage = pathname === '/login' || pathname === '/register'

	useEffect(() => {
		router.refresh()

		if (!currentUser) {
			router.replace('/login')
		}
	}, [router])

	if (isOnAuthPage || !currentUser) {
		return null
	}

	return (
		<>
			<header className='fixed w-full bg-white dark:bg-background flex items-center justify-between px-4 py-3 border-b-[1px] z-50'>
				<Button variant='ghost' size='sm' onClick={sidebar.onOpen}>
					<Icons.menu size={20} />
				</Button>

				<UserInfo currentUser={currentUser} notifications={2} />
			</header>
		</>
	)
}

export default Navbar
