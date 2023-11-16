import { addHours, compareDesc, format, isToday } from 'date-fns'
import Link from 'next/link'

import { Heading } from '@/components/heading'
import { Skeleton } from '@/components/ui/skeleton'
import { CreateWorkoutCard } from '@/components/workout/create-workout-card'
import { WorkoutCard } from '@/components/workout/workout-card'
import { prisma } from '@/lib/prisma'

type Props = {
	profileId: string
}

export const NextExercise = async ({ profileId }: Props) => {
	const workouts = await prisma.workout.findMany({
		where: {
			profileId: profileId,
			completed: false,
		},
	})

	const nextWorkout = workouts.find(
		(workout) =>
			isToday(new Date(workout.date)) ||
			compareDesc(Date.now(), new Date(workout.date)) === 1
	)

	const date = addHours(new Date(nextWorkout?.date || ''), 2)

	return (
		<div>
			{nextWorkout ? (
				<>
					<Heading
						title={format(date, 'dd LLL yyyy')}
						description='Your next workout'
					/>
					<WorkoutCard workout={nextWorkout} highlighted />
				</>
			) : (
				<CreateWorkoutCard />
			)}

			<Link href='/workouts'>
				<p className='pt-2 text-sm text-center text-secondary hover:underline'>
					All workouts
				</p>
			</Link>
		</div>
	)
}

const NextExerciseSkeleton = () => {
	return (
		<div className='flex flex-col'>
			<Skeleton className='h-4 mb-2 w-28' />
			<Skeleton className='w-40 h-2 mb-4' />

			<WorkoutCard.Skeleton />
		</div>
	)
}

NextExercise.Skeleton = NextExerciseSkeleton
