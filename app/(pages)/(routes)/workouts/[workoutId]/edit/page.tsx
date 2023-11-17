import { redirect } from 'next/navigation'

import { EditWorkoutForm } from '@/components/forms/edit-workout-form'
import { getProfile } from '@/lib/get-profile'
import { prisma } from '@/lib/prisma'

const WorkoutEditPage = async ({
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
			trainings: true,
		},
	})

	if (!workout) {
		return redirect('/workouts')
	}

	return <EditWorkoutForm workout={workout} />
}

export default WorkoutEditPage
