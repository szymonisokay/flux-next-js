'use client'

import { IconType } from 'react-icons'

interface MenuItemProps {
	icon: IconType
	label: string
	onClick: () => void
	error?: boolean
}

const MenuItem: React.FC<MenuItemProps> = ({
	icon: Icon,
	label,
	onClick,
	error,
}) => {
	return (
		<div
			onClick={onClick}
			className={`flex items-center w-full gap-4 px-4 py-4 duration-150 rounded-md cursor-pointer group
      ${error ? 'hover:bg-red-200/30' : 'hover:bg-neutral-300/30'}
      `}
		>
			<Icon
				size={20}
				className={`${error ? 'text-red-600' : 'text-neutral-900'}`}
			/>

			<div className={`${error ? 'text-red-600' : 'text-neutral-900'}`}>
				{label}
			</div>
		</div>
	)
}

export default MenuItem
