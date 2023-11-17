import { redirect } from 'next/navigation'

import { prisma } from '@/lib/prisma'

import { ExercisesList } from './exercises-list'

type Props = {
	workoutId: string
}

export const Wrapper = async ({ workoutId }: Props) => {
	const workout = await prisma.workout.findUnique({
		where: {
			id: workoutId,
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
		redirect('/workouts')
	}

	return <ExercisesList workout={workout} />
}
