'use client'

import { format, isEqual, startOfToday } from 'date-fns'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Workout } from '@prisma/client'
import { Icons } from '../../components/icons'
import WorkoutCard from '../../components/workouts/WorkoutCard'
import useAddWorkoutModal from '../../hooks/useAddWorkoutModal'

interface CalendatClientProps {
	workouts: Workout[]
}

const CalendarClient: React.FC<CalendatClientProps> = ({ workouts }) => {
	const addWorkoutModal = useAddWorkoutModal()

	const [selectedDay, setSelectedDay] = useState<Date>(startOfToday())

	const workoutsForSpecificDay = useMemo(() => {
		return workouts.filter((workout) => isEqual(workout.date, selectedDay))
	}, [workouts, selectedDay])

	const onDaySelected = useCallback((day: any) => {
		if (day === undefined) return

		setSelectedDay(day as Date)
	}, [])

	useEffect(() => {
		addWorkoutModal.addDate(selectedDay as Date)
	}, [selectedDay])

	return (
		<div className='px-4 pt-20 pb-4'>
			<p className='mb-6 text-lg font-semibold'>Workouts calendar</p>
			<Calendar
				mode='single'
				showOutsideDays
				fixedWeeks
				onSelect={onDaySelected}
				selected={selectedDay}
				workouts={workouts}
			/>
			<div className='flex items-center justify-between mt-6 '>
				<p className='text-lg font-semibold'>
					Workouts for {format(selectedDay, 'do MMMM')}
				</p>

				<Button
					variant='outline'
					size='sm'
					onClick={addWorkoutModal.onOpen}
				>
					<Icons.add size={20} />
				</Button>
			</div>

			{workoutsForSpecificDay.length ? (
				<div className='flex flex-col gap-4 mt-4'>
					{workoutsForSpecificDay.map((workout) => (
						<WorkoutCard key={workout.id} workout={workout} />
					))}
				</div>
			) : (
				<div className='flex flex-col items-center gap-4 mt-20'>
					<p className='text-sm text-muted-foreground'>
						No added workouts in this period of time
					</p>

					<Button onClick={addWorkoutModal.onOpen} variant='outline'>
						Add new workout
					</Button>
				</div>
			)}
		</div>
	)
}

export default CalendarClient
