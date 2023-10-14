import { redirectToSignIn } from '@clerk/nextjs'

import { CreateWorkoutForm } from '@/components/forms/create-workout-form'
import { PageHeader } from '@/components/page-header'
import { getProfile } from '@/lib/get-profile'
import { prisma } from '@/lib/prisma'

import { WorkoutActions } from './_components/workout-actions'
import { WorkoutDetails } from './_components/workout-details'

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
		include: {
			trainings: true,
		},
	})

	return (
		<>
			<div className='flex items-center justify-between gap-x-4'>
				<PageHeader
					title={!workout ? 'Create workout' : workout.name}
					description={
						!workout
							? 'Fill in all required details'
							: 'Your workout information'
					}
				/>
				{workout && <WorkoutActions />}
			</div>

			{!workout ? (
				<CreateWorkoutForm workout={workout} />
			) : (
				<WorkoutDetails workout={workout} />
			)}
		</>
	)
}

export default WorkoutPage
