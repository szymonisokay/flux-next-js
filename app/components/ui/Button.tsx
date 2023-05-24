import { ClipLoader, PuffLoader } from 'react-spinners'

interface ButtonProps {
	text: string
	disabled?: boolean
	outline?: boolean
	isLoading?: boolean
	onClick: () => void
}

const Button: React.FC<ButtonProps> = ({
	text,
	disabled,
	outline,
	isLoading,
	onClick,
}) => {
	return (
		<button
			className={`
			relative
			w-full
			py-3
			text-base
			font-normal
			rounded-md
			duration-300
			disabled:opacity-70
			disabled:cursor-not-allowed
			${outline ? 'border-2 border-green-600' : 'border-0'}
			${outline ? 'bg-white' : 'bg-green-600'}
			${outline ? 'text-neutral-900' : 'text-neutral-100'}
			${outline ? 'hover:bg-green-600 hover:text-neutral-100' : 'hover:bg-green-800'}
			${outline ? 'focus:bg-green-600 focus:text-neutral-100' : 'focus:bg-green-800'}
		`}
			onClick={onClick}
			disabled={disabled}
		>
			{isLoading && (
				<div className='absolute top-[13px] left-4 '>
					<ClipLoader size={22} color='white' />
				</div>
			)}

			{text}
		</button>
	)
}

export default Button
