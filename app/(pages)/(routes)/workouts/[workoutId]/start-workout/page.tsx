import { redirect } from 'next/navigation'

import { PageHeader } from '@/components/page-header'
import { getProfile } from '@/lib/get-profile'
import { prisma } from '@/lib/prisma'

import { Heading } from '@/components/heading'
import { Separator } from '@/components/ui/separator'
import { MainExercise } from './_components/main-exercise'

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

	console.log(workout)
	const trainingsNotCompleted = workout.trainings.filter(
		(training) => !training.completed
	)

	return (
		<>
			<PageHeader
				title={
					!trainingsNotCompleted.length
						? 'Workout completed'
						: 'Start working out'
				}
				description={
					!trainingsNotCompleted.length
						? 'You have completed your workout'
						: 'Complete all of your exercises'
				}
			/>

			<div className='mt-4'>
				{!!trainingsNotCompleted.length && (
					<MainExercise training={trainingsNotCompleted[0]} />
				)}

				{trainingsNotCompleted.length > 1 && (
					<>
						<Separator className='my-4' />
						<Heading title='Next exercise' />

						{trainingsNotCompleted.map((training, index) => (
							<>
								{index > 0 && (
									<MainExercise
										key={training.id}
										training={training}
									/>
								)}
							</>
						))}
					</>
				)}
			</div>
		</>
	)
}

export default StartWorkoutPage
