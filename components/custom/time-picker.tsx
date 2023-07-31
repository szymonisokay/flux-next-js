'use client'

import { ClockIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const hoursArray = Array.from(Array(24).keys(), (value) =>
	value < 10 ? String(`0${value}`) : String(value)
)
const minutesArray = Array.from(Array(60).keys(), (value) =>
	value < 10 ? String(`0${value}`) : String(value)
)

interface TimePickerProps {
	value?: string
	onChange: (date: string) => void
}

export const TimePicker = ({ value, onChange }: TimePickerProps) => {
	const [open, setOpen] = useState<boolean>(false)
	const [time, setTime] = useState<string>()
	const [selectedHour, setHours] = useState<string | undefined>(
		value?.split(':')[0]
	)
	const [selectedMinutes, setMinutes] = useState<string | undefined>(
		value?.split(':')[1]
	)

	const hourRef = useRef<HTMLButtonElement>(null)
	const minutesRef = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		const hours = selectedHour
		const minutes = selectedMinutes

		if (!hours || !minutes) return

		const time = `${hours}:${minutes}`

		setTime(time)
		onChange(time)
	}, [selectedHour, selectedMinutes])

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (hourRef.current && minutesRef.current) {
				hourRef.current.scrollIntoView({
					behavior: 'instant',
					inline: 'center',
				})

				minutesRef.current.scrollIntoView({
					behavior: 'instant',
					inline: 'center',
				})
			}
		}, 0)

		return () => clearTimeout(timeout)
	}, [hourRef, open])

	return (
		<Popover open={open}>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					className={cn(
						'w-full justify-start text-left font-normal',
						!time && 'text-muted-foreground'
					)}
					onClick={() => setOpen((state) => !state)}
				>
					<ClockIcon className='w-4 h-4 mr-2' />
					{time ? time : <span>Select time</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='flex flex-col w-full max-w-sm p-3 gap-y-3'>
				<div className='block overflow-hidden no-scroll'>
					<p className='mb-2 text-sm font-medium'>Hours</p>
					<div
						id='hours-list'
						className='flex p-2 overflow-auto gap-x-2 '
					>
						{hoursArray.map((hour) => (
							<Button
								key={hour}
								ref={selectedHour === hour ? hourRef : null}
								variant='ghost'
								className={cn(
									'h-9 w-9 p-3 font-normal',
									selectedHour === hour &&
										'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground'
								)}
								onClick={() => setHours(hour)}
							>
								{hour}
							</Button>
						))}
					</div>
				</div>

				<div className='flex flex-col overflow-hidden no-scroll'>
					<p className='mb-2 text-sm font-medium'>Minutes</p>
					<div className='flex p-2 overflow-auto gap-x-2'>
						{minutesArray.map((minutes) => (
							<Button
								key={minutes}
								ref={
									selectedMinutes === minutes
										? minutesRef
										: undefined
								}
								variant='ghost'
								className={cn(
									'h-9 w-9 p-3 font-normal',
									selectedMinutes === minutes &&
										'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground'
								)}
								onClick={() => setMinutes(minutes)}
							>
								{minutes}
							</Button>
						))}
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}
