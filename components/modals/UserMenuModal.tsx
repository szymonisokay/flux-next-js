'use client'

import { User } from '@prisma/client'
import useUserMenuModal from '../../hooks/useUserMenuModal'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { MenuItem } from '../../interfaces/menuItem.interface'
import Menu from '../custom/Menu'
import Modal from './modal'

import { Icons } from '@/components/icons'
import Avatar from '../custom/Avatar'
import { Button } from '../ui/button'

interface UserMenuModalProps {
	currentUser?: User | null
}

const UserMenuModal: React.FC<UserMenuModalProps> = ({ currentUser }) => {
	const userMenuModal = useUserMenuModal()
	const router = useRouter()

	const onLogOut = useCallback(async () => {
		signOut({ redirect: false }).then(() => {
			userMenuModal.onClose()
			setTimeout(() => {
				router.push('/login')
			}, 150)
		})
	}, [userMenuModal, router])

	const menuItems: MenuItem[] = [
		{
			label: 'Account',
			href: '/',
			action: userMenuModal.onClose,
			icon: Icons.user,
		},
		{
			label: 'Calendar',
			href: '/',
			action: userMenuModal.onClose,
			icon: Icons.calendarDays,
		},
		{
			label: 'Log out',
			href: '/',
			action: onLogOut,
			icon: Icons.logout,
		},
	]

	return (
		<Modal
			title='User menu'
			isOpen={userMenuModal.isOpen}
			onClose={userMenuModal.onClose}
		>
			<div className='flex items-center justify-between'>
				<div className='flex items-center'>
					<Avatar src={currentUser?.image} />
					<div className='ml-4 space-y-1'>
						<p className='text-sm font-medium leading-none'>
							{currentUser?.name}
						</p>
						<p className='text-sm text-muted-foreground'>
							{currentUser?.email}
						</p>
					</div>
				</div>

				<Button variant='ghost' size='sm' onClick={() => {}}>
					<Icons.pencil size={20} />
				</Button>
			</div>

			<div className='flex flex-col pt-4'>
				<Menu menuItems={menuItems} />
			</div>
		</Modal>
	)
}

export default UserMenuModal
