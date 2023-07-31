'use client'

import { User } from '@prisma/client'
import React from 'react'
import UserMenuModal from '../components/modals/UserMenuModal'

interface ModalProviderProps {
	currentUser?: User | null
	children: React.ReactNode
}

const ModalProvider: React.FC<ModalProviderProps> = ({
	children,
	currentUser,
}) => {
	return (
		<>
			<UserMenuModal currentUser={currentUser} />
			{children}
		</>
	)
}

export default ModalProvider
