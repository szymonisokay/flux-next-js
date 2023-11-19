import { redirect } from 'next/navigation'

import { CreateWorkoutForm } from '@/components/forms/create-workout-form'
import { prisma } from '@/lib/prisma'

type Props = {
	profileId: string
	workoutId: string
}

export const WorkoutWrapper = async ({ profileId, workoutId }: Props) => {
	const workout = await prisma.workout.findFirst({
		where: {
			id: workoutId,
			profileId: profileId,
		},
	})

	if (workout) {
		return redirect(`/workouts/${workout.id}/edit`)
	}

	return <CreateWorkoutForm />
}
