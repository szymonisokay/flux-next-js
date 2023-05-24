'use client'

import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form'

interface InputProps {
	id: string
	label: string
	type?: string
	disabled?: boolean
	required?: boolean
	register: UseFormRegister<FieldValues>
	errors: FieldErrors
}

const Input: React.FC<InputProps> = ({
	id,
	label,
	type = 'text',
	disabled,
	required,
	register,
	errors,
}) => {
	return (
		<div className='relative w-full'>
			<input
				id={id}
				type={type}
				disabled={disabled}
				{...register(id, { required })}
				placeholder=' '
				className={`
					peer
					w-full
					p-2
					pt-5
					pl-4
					bg-white
					border-2
					rounded-md
					outline-none
					transition
					disabled:opacity-70
					disabled:cursor-not-allowed
					${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
					${errors[id] ? 'focus:border-rose-500' : 'focus:border-green-600'}
				`}
			/>
			<label
				htmlFor={id}
				className={`
				absolute
				text-base
				duration-150
				transform
				-translate-y-3
				top-4
				z-10
				origin-[0] 
				left-4
				scale-75
				peer-placeholder-shown:scale-100
				peer-placeholder-shown:translate-y-0
				peer-focus:scale-75
				peer-focus:-translate-y-3				
				${errors[id] ? 'text-rose-500' : 'text-neutral-500'}
			`}
			>
				{label}
			</label>
		</div>
	)
}

export default Input
