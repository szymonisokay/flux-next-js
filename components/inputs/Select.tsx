import { SelectValue } from '@radix-ui/react-select'
import React from 'react'
import { cn } from '../../lib/utils'
import {
	Select as RadixSelect,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from '../ui/select'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	value?: string
	onValueChange: (value: string) => void
	items: string[]
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
	(
		{ className, disabled, id, placeholder, value, onValueChange, items },
		ref
	) => {
		return (
			<RadixSelect
				value={value}
				defaultValue={value}
				onValueChange={onValueChange}
			>
				<SelectTrigger
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
				<SelectContent position='popper'>
					<SelectItem value=''>{placeholder}</SelectItem>
					{items.map((item) => (
						<SelectItem key={item} value={item}>
							{item}
						</SelectItem>
					))}
				</SelectContent>
			</RadixSelect>
		)
	}
)

export default Select
