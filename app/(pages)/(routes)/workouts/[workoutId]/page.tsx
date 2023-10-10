import { redirectToSignIn } from '@clerk/nextjs'

import { CreateWorkoutForm } from '@/components/forms/create-workout-form'
import { PageHeader } from '@/components/page-header'
import { getProfile } from '@/lib/get-profile'
import { prisma } from '@/lib/prisma'

const WorkoutPage = async ({ params }: { params: { workoutId: string } }) => {
	const profile = await getProfile()

	if (!profile) {
		return redirectToSignIn()
	}

	const workout = await prisma.workout.findFirst({
		where: {
			id: params.workoutId,
			profileId: profile.id,
		},
	})

	return (
		<>
			<PageHeader
				title='Create workout'
				description='Fill in all required details'
			/>

			<CreateWorkoutForm workout={workout} />
		</>
	)
}

export default WorkoutPage
