'use client'

import { IconType } from 'react-icons'

interface IconButtonWithTextProps {
	icon: IconType
	iconSize?: number
	label: string
	onClick: () => void
}

const IconButtonWithText: React.FC<IconButtonWithTextProps> = ({
	icon: Icon,
	iconSize = 18,
	label,
	onClick,
}) => {
	return (
		<button
			onClick={onClick}
			className={`relative group duration-150 flex items-center justify-center p-3 rounded-md w-full hover:bg-neutral-300/30`}
		>
			<div className='absolute left-4'>
				<Icon
					size={iconSize}
					className='text-gray-300 duration-150 group-hover:text-neutral-900'
				/>
			</div>
			<div className='text-gray-500 duration-150 group-hover:text-neutral-900'>
				{label}
			</div>
		</button>
	)
}

export default IconButtonWithText
