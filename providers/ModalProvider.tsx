'use client'

import { User } from '@prisma/client'
import React from 'react'
import MenuModal from '../components/modals/MenuModal'
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
			<MenuModal />
			<UserMenuModal currentUser={currentUser} />
			{/* <AddWorkoutModal /> */}
			{children}
		</>
	)
}

export default ModalProvider
