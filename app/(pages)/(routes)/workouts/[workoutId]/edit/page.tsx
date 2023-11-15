import { redirect } from 'next/navigation'

import { Completed } from '@/components/completed'
import { EditWorkoutForm } from '@/components/forms/edit-workout-form'
import { PageHeader } from '@/components/page-header'
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

	return (
		<>
			<div className='flex items-center justify-between w-full'>
				<PageHeader
					href='/workouts'
					title='Edit workout'
					description='Edit your workout details'
				/>

				{workout.completed && (
					<Completed icon size='sm' variant='colored' />
				)}
			</div>

			<EditWorkoutForm workout={workout} />
		</>
	)
}

export default WorkoutEditPage
