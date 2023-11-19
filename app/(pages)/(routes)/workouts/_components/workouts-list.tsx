'use client'

import { Workout } from '@prisma/client'
import { format, isToday } from 'date-fns'
import { PlusIcon } from 'lucide-react'

import { FloatingActionButton } from '@/components/floating-action-button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { WorkoutCard } from '@/components/workout/workout-card'
import { useScrollToWorkout } from '@/hooks/use-scroll-to-workout'
import { getCorrectDivIds } from '@/lib/get-div-id'
import { cn } from '@/lib/utils'

type Props = {
	workoutsByDate: { [key: string]: Workout[] }
}

export const WorkoutsList = ({ workoutsByDate }: Props) => {
	useScrollToWorkout()

	return (
		<>
			<FloatingActionButton
				href='/workouts/new'
				label='Add workout'
				icon={PlusIcon}
			/>
			<ScrollArea className='relative h-full px-3 -mx-2'>
				<div className='relative flex flex-col px-1 py-4 pt-0 pb-8 pr-2 gap-y-4'>
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
