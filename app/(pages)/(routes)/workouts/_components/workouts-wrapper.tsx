'use client'

import { Workout } from '@prisma/client'
import { compareDesc, format, isToday } from 'date-fns'
import { PlusIcon } from 'lucide-react'
import { useEffect } from 'react'

import { FloatingActionButton } from '@/components/floating-action-button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { WorkoutCard } from '@/components/workout/workout-card'
import { cn } from '@/lib/utils'

type Props = {
	workouts: Workout[]
}

export const WorkoutsWrapper = ({ workouts }: Props) => {
	const workoutsByDate = workouts.reduce((result, item) => {
		const date = item.date

		if (!result[date]) {
			result[date] = []
		}

		result[date].push(item)

		return result
	}, {} as { [key: string]: Workout[] })

	const getCorrectDivIds = (date: string) => {
		if (isToday(new Date(date))) {
			return 'today'
		}

		if (compareDesc(Date.now(), new Date(date)) === 1) {
			return 'next-day'
		}

		return ''
	}

	useEffect(() => {
		const timeout = setTimeout(() => {
			const todayDiv = document.querySelector('#today')
			const nextDayDiv = document.querySelectorAll('#next-day')[0]

			if (!todayDiv) {
				nextDayDiv?.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				})

				return
			}

			todayDiv.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
		}, 100)

		return () => clearTimeout(timeout)
	}, [])

	return (
		<>
			<FloatingActionButton
				href='/workouts/new'
				label='Add workout'
				icon={PlusIcon}
			/>
			<ScrollArea className='h-[calc(100vh-160px)] mt-4 -mx-2 px-3 relative'>
				<div className='relative flex flex-col px-1 py-4 pb-8 pr-2 gap-y-4'>
					{Object.entries(workoutsByDate).map(([date, workouts]) => (
						<div
							className='relative'
							key={date}
							id={getCorrectDivIds(date)}
						>
							<div className='flex items-center justify-between ml-3'>
								<p
									className={cn(
										'text-sm leading-snug tracking-tight text-secondary',
										isToday(new Date(date)) &&
											'text-primary'
									)}
								>
									{format(new Date(date), 'dd LLL yyyy')}
								</p>

								{isToday(new Date(date)) && (
									<Badge
										variant='default'
										className='rounded-md'
									>
										Today
									</Badge>
								)}
							</div>

							{workouts.map((workout, index) => (
								<div key={workout.id} className='ml-5'>
									<WorkoutCard
										workout={workout}
										highlighted={
											index === 0 &&
											isToday(new Date(date))
										}
									/>
								</div>
							))}

							<div
								className={cn(
									'absolute -left-[2px] z-10 w-2 h-2 rounded-full top-[6px] bg-secondary',
									isToday(new Date(date)) && 'bg-primary'
								)}
							/>
						</div>
					))}

					{/* TODO: Display when at least one workout */}
					<div className='absolute top-0 w-1 h-full rounded-full left-1 bg-muted' />
				</div>
			</ScrollArea>
		</>
	)
}
