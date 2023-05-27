'use client'

import { User } from '@prisma/client'

import IconButton from '../ui/IconButton'

import { BiBell, BiUser } from 'react-icons/bi'
import useUserMenuModal from '../../hooks/useUserMenuModal'

interface UserInfoProps {
	currentUser?: User | null
	notifications?: number
}

const UserInfo: React.FC<UserInfoProps> = ({ currentUser, notifications }) => {
	const userMenuModal = useUserMenuModal()

	return (
		<div className='flex items-center gap-2 px-2'>
			<IconButton
				icon={BiBell}
				size={22}
				onClick={() => {}}
				showNotifications={!!notifications}
			/>
			<IconButton
				icon={BiUser}
				size={22}
				onClick={userMenuModal.onOpen}
			/>
			{/* <Avatar rounded small src={currentUser?.image} onClick={() => {}} /> */}
		</div>
	)
}

export default UserInfo
