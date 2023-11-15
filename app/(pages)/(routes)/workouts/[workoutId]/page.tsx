import { redirect } from 'next/navigation'

import { CreateWorkoutForm } from '@/components/forms/create-workout-form'
import { PageHeader } from '@/components/page-header'
import { getProfile } from '@/lib/get-profile'
import { prisma } from '@/lib/prisma'

const WorkoutPage = async ({ params }: { params: { workoutId: string } }) => {
	const profile = await getProfile()

	if (!profile) {
		return redirect('/')
	}

	const workout = await prisma.workout.findFirst({
		where: {
			id: params.workoutId,
			profileId: profile.id,
		},
	})

	if (workout) {
		return redirect(`/workouts/${workout.id}/edit`)
	}

	return (
		<>
			<PageHeader
				href='/workouts'
				title='Create workout'
				description='Fill in all required details'
			/>

			<CreateWorkoutForm />
		</>
	)
}

export default WorkoutPage
