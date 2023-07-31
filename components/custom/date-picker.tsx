'use client'

import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface DatePickerProps {
	value?: Date
	onChange: (date: Date | undefined) => void
}

export const DatePicker = ({ value, onChange }: DatePickerProps) => {
	const [open, setOpen] = useState<boolean>(false)
	const [date, setDate] = useState<Date | undefined>(value)

	const onSelect = (date: Date | undefined) => {
		onChange(date)
		setDate(date)
		setOpen(false)
	}

	return (
		<Popover open={open}>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					className={cn(
						'w-full justify-start text-left font-normal',
						!date && 'text-muted-foreground'
					)}
					onClick={() => setOpen((state) => !state)}
				>
					<CalendarIcon className='w-4 h-4 mr-2' />
					{date ? format(date, 'PPP') : <span>Select date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[calc(100vw-2rem)] max-w-sm p-0'>
				<Calendar
					className='w-full'
					mode='single'
					selected={date}
					onSelect={onSelect}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	)
}
