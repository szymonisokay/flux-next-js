'use client'

import { User } from '@prisma/client'
import useUserMenuModal from '../../hooks/useUserMenuModal'
import MenuItem from '../navbar/MenuItem'
import Avatar from '../ui/Avatar'
import IconButton from '../ui/IconButton'
import Modal from './Modal'

import { BiDumbbell, BiPencil, BiUser } from 'react-icons/bi'
import {
	HiOutlineArchive,
	HiOutlineDocumentText,
	HiOutlineLogout,
} from 'react-icons/hi'
import { RxCalendar } from 'react-icons/rx'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

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

	const body = (
		<>
			<div className='flex items-center justify-between p-4'>
				<div className='flex items-center gap-4'>
					<Avatar rounded src={currentUser?.image} />
					<div className='flex flex-col gap-0'>
						<div className='text-base font-semibold'>
							{currentUser?.name}
						</div>
						<div className='text-sm font-normal text-neutral-500'>
							{currentUser?.email}
						</div>
					</div>
				</div>

				<IconButton icon={BiPencil} onClick={() => {}} />
			</div>

			<div className='flex flex-col border-t-[1px] p-4'>
				<MenuItem icon={BiUser} label='Account' onClick={() => {}} />
				<MenuItem
					icon={RxCalendar}
					label='Calendar'
					onClick={() => {}}
				/>
				<MenuItem
					icon={BiDumbbell}
					label='Exercises'
					onClick={() => {}}
				/>
				<MenuItem
					icon={HiOutlineDocumentText}
					label='Training plans'
					onClick={() => {}}
				/>
				<MenuItem
					icon={HiOutlineArchive}
					label='Archives'
					onClick={() => {}}
				/>
				<MenuItem
					error
					icon={HiOutlineLogout}
					label='Log out'
					onClick={onLogOut}
				/>
			</div>
		</>
	)

	const footer = <div>footer</div>

	return (
		<Modal
			title='User menu'
			isOpen={userMenuModal.isOpen}
			onClose={userMenuModal.onClose}
			body={body}
			footer={footer}
		/>
	)
}

export default UserMenuModal
