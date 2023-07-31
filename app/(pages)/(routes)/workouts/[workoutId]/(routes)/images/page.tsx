import prisma from '@/lib/prismadb'
import { redirect } from 'next/navigation'

import { WorkoutImagesClient } from './client'

const WorkoutImagesPage = async ({
	params,
}: {
	params: { workoutId: string }
}) => {
	const workout = await prisma.workout.findUnique({
		where: {
			id: params.workoutId,
		},
		include: {
			images: true,
		},
	})

	if (!workout) {
		redirect('/workouts')
	}

	return <WorkoutImagesClient workout={workout} />
}

export default WorkoutImagesPage
