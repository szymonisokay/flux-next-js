'use client'

import { User } from '@prisma/client'

import useUserMenuModal from '../../hooks/useUserMenuModal'
import { Icons } from '../icons'
import { Button } from '../ui/button'

interface UserInfoProps {
	currentUser?: User | null
	notifications?: number
}

const UserInfo: React.FC<UserInfoProps> = ({ currentUser, notifications }) => {
	const userMenuModal = useUserMenuModal()

	return (
		<div className='flex items-center gap-2 px-2'>
			<Button variant='ghost' size='sm' onClick={() => {}}>
				<Icons.bell size={20} />
			</Button>

			<Button variant='ghost' size='sm' onClick={userMenuModal.onOpen}>
				<Icons.user size={20} />
			</Button>
		</div>
	)
}

export default UserInfo
