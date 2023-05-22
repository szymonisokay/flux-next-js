'use client'

import { IconType } from 'react-icons'

interface InputProps {
	id: string
	label: string
	onChange: (ev: any) => void
	icon?: IconType
	error?: string
	type?: string
}

const Input: React.FC<InputProps> = ({ id, label, onChange, icon: Icon, error, type = 'text' }) => {
	return (
		<div className='relative w-full'>
			<input
				id={id}
				type={type}
				onChange={onChange}
				placeholder=' '
				className='w-full px-4 pt-5 pb-1 border-2 rounded-md appearance-none border-neutral-400/50 peer'
			/>
			<label className='absolute duration-150 left-4 peer-placeholder-shown:translate-y-4 peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:scale-100 peer-focus:-translate-y-1 peer-focus:scale-75'>
				{label}
			</label>
		</div>
	)
}

export default Input
