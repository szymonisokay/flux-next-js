'use client'

import { Workout } from '@prisma/client'
import { format, isToday } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'

import { Icons } from '@/components/icons'
import Heading from '@/components/ui/Heading'
import { Button } from '@/components/ui/button'
import WorkoutCard from '@/components/workouts/WorkoutCard'

interface WorkoutsClientProps {
	workouts: Workout[]
}

export const WorkoutsClient = ({ workouts }: WorkoutsClientProps) => {
	const router = useRouter()

	const groupedWorkouts = useMemo(() => {
		const grouped = workouts.reduce((grouped, workout) => {
			const date = workout.date.toISOString()

			grouped[date] = grouped[date] || []
			grouped[date].push(workout)

			return grouped
		}, {} as { [k: string]: Workout[] })

		const groupedWorkouts = []

		for (const [key, value] of Object.entries(grouped)) {
			groupedWorkouts.push({ date: key, workouts: value })
		}

		return groupedWorkouts
	}, [workouts])

	useEffect(() => {
		document.querySelector('#today')?.scrollIntoView()
	}, [])

	return (
		<div className='flex flex-col gap-y-4'>
			<div className='flex items-center justify-between'>
				<Heading
					title='Workouts'
					subtitle='List of your old and upcoming workouts'
				/>

				<Button
					title='Add workout'
					variant='outline'
					size='sm'
					onClick={() => router.push('/workouts/new')}
				>
					<Icons.add size={20} />
				</Button>
			</div>

			<div className='flex flex-col h-[calc(100vh-160px)] overflow-y-auto gap-y-4 scroll-smooth pb-4'>
				{groupedWorkouts.map(({ date, workouts }) => (
					<div
						id={isToday(new Date(date)) ? 'today' : undefined}
						key={date}
					>
						<p className='mb-2 font-semibold'>
							{format(new Date(date), 'do MMMM')}
						</p>
						<div className='flex flex-col gap-y-4'>
							{workouts.map((workout) => (
								<WorkoutCard
									key={workout.id}
									workout={workout}
								/>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
