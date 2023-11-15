import { addHours, compareDesc, format, isToday } from 'date-fns'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Heading } from '@/components/heading'
import { CreateWorkoutCard } from '@/components/workout/create-workout-card'
import { WorkoutCard } from '@/components/workout/workout-card'
import { createProfile } from '@/lib/create-profile'
import { getProfile } from '@/lib/get-profile'
import { prisma } from '@/lib/prisma'

const DashboardPage = async () => {
	await createProfile()

	const profile = await getProfile()

	if (!profile) {
		return redirect('/')
	}

	const workouts = await prisma.workout.findMany({
		where: {
			profileId: profile.id,
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
		<>
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
		</>
	)
}

export default DashboardPage
