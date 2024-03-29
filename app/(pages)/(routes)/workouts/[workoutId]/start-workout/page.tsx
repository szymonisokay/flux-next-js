import { redirect } from 'next/navigation'

import { getProfile } from '@/lib/get-profile'
import { prisma } from '@/lib/prisma'

import { MainExercise } from './_components/main-exercise'
import { NextExercises } from './_components/next-exercises'
import { WorkoutCompleted } from './_components/workout-completed'

const StartWorkoutPage = async ({
	params,
}: {
	params: { workoutId: string }
}) => {
	const profile = await getProfile()

	if (!profile) {
		return redirect('/')
	}

	const workout = await prisma.workout.findFirst({
		where: {
			id: params.workoutId,
			profileId: profile.id,
		},
		include: {
			trainings: {
				include: {
					exercise: true,
					sets: true,
				},
			},
		},
	})

	if (!workout) {
		return redirect('/workouts')
	}

	const trainingsNotCompleted = workout.trainings.filter(
		(training) => !training.completed
	)

	return (
		<>
			{!!trainingsNotCompleted.length ? (
				<MainExercise training={trainingsNotCompleted[0]} />
			) : (
				<WorkoutCompleted trainings={trainingsNotCompleted} />
			)}

			{trainingsNotCompleted.length > 1 && (
				<NextExercises trainings={trainingsNotCompleted} />
			)}
		</>
	)
}

export default StartWorkoutPage
