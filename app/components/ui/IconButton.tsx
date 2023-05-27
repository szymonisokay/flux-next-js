'use client'

import { IconType } from 'react-icons'

interface IconButtonProps {
	icon: IconType
	size?: number
	rounded?: boolean
	showNotifications?: boolean
	onClick: () => void
}

const IconButton: React.FC<IconButtonProps> = ({
	icon: Icon,
	size = 22,
	rounded,
	showNotifications,
	onClick,
}) => {
	return (
		<button
			className={`p-2 duration-150 cursor-pointer select-none hover:bg-neutral-300/30 active:bg-neutral-300/60 ${
				rounded ? 'rounded-full' : 'rounded-md'
			}`}
			onClick={onClick}
		>
			<div className='relative'>
				<Icon size={size} className='duration-150 text-neutral-900' />
				{showNotifications && (
					<div className='absolute top-0 w-2 h-2 rounded-full right-[3px] bg-rose-600'></div>
				)}
			</div>
		</button>
	)
}

export default IconButton
