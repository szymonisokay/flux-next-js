'use client'

import { User } from '@prisma/client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { IoMenuOutline } from 'react-icons/io5'
import IconButton from '../ui/IconButton'
import UserInfo from './UserInfo'

interface NavbarProps {
	currentUser?: User | null
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
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
		<header className='fixed w-full flex items-center justify-between px-4 py-3 border-b-[1px] bg-neutral-100 '>
			<IconButton
				icon={IoMenuOutline}
				size={28}
				onClick={() => {
					console.log('click')
				}}
			/>

			<UserInfo currentUser={currentUser} notifications={2} />
		</header>
	)
}

export default Navbar
