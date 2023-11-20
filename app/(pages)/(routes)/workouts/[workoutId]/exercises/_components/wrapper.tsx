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
	})

	const trainings = await prisma.training.findMany({
		where: {
			workoutId,
		},
		include: {
			exercise: true,
			sets: true,
		},
		orderBy: {
			createdAt: 'asc',
		},
	})

	if (!workout) {
		redirect('/workouts')
	}

	return <ExercisesList trainings={trainings} />
}
