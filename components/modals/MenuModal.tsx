'use client'

import useMenuModal from '../../hooks/useMenuModal'
import { MenuItem } from '../../interfaces/menuItem.interface'
import Menu from '../custom/Menu'
import { Icons } from '../icons'
import Modal from './Modal'

const MenuModal = () => {
	const menuModal = useMenuModal()

	const menuItems: MenuItem[] = [
		{
			label: 'Dashboard',
			href: '/',
			icon: Icons.dashboard,
			action: menuModal.onClose,
		},
		{
			label: 'Calendar',
			href: '/calendar',
			icon: Icons.calendarDays,
			action: menuModal.onClose,
		},
		{
			label: 'Workouts',
			href: '/workouts',
			icon: Icons.activity,
			action: menuModal.onClose,
		},
		{
			label: 'Training Plans',
			href: '/training-plans',
			icon: Icons.zap,
			action: menuModal.onClose,
		},
		{
			label: 'Exercises',
			href: '/exercises',
			icon: Icons.dumbbell,
			action: menuModal.onClose,
		},
	]

	const body = (
		<div>
			<Menu menuItems={menuItems} />
		</div>
	)

	return (
		<Modal
			title='Menu'
			body={body}
			isOpen={menuModal.isOpen}
			onClose={menuModal.onClose}
		/>
	)
}

export default MenuModal
