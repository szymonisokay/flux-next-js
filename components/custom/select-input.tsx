import { SelectValue } from '@radix-ui/react-select'
import React from 'react'
import { cn } from '../../lib/utils'
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	value?: string
	onValueChange: (value: string) => void
	items: string[]
}

export const SelectInput = React.forwardRef<HTMLButtonElement, SelectProps>(
	(
		{ className, disabled, id, placeholder, value, onValueChange, items },
		ref
	) => {
		return (
			<Select
				value={value}
				defaultValue={value}
				onValueChange={onValueChange}
			>
				<SelectTrigger
					title={value}
					className={cn('', className)}
					id={id}
					ref={ref}
					disabled={disabled}
				>
					<SelectValue
						defaultValue={value}
						placeholder={placeholder}
					/>
				</SelectTrigger>
				<SelectContent position='popper' className='max-h-[300px]'>
					<SelectItem value=''>{placeholder}</SelectItem>
					{items.map((item) => (
						<SelectItem key={item} value={item}>
							{item}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		)
	}
)
