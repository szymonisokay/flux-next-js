import { redirect } from 'next/navigation'

import { Completed } from '@/components/completed'
import { EditWorkoutForm } from '@/components/forms/edit-workout-form'
import { PageHeader } from '@/components/page-header'
import { Tooltip } from '@/components/tooltip'
import { Button } from '@/components/ui/button'
import { getProfile } from '@/lib/get-profile'
import { prisma } from '@/lib/prisma'
import { PlayCircleIcon } from 'lucide-react'
import Link from 'next/link'

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
			<div className='flex items-center w-full'>
				<PageHeader
					title='Edit workout'
					description='Edit your workout details'
				/>

				{workout.completed && (
					<Completed icon size='sm' variant='colored' />
				)}

				{!!workout.trainings.length && (
					<Tooltip
						label='Start working out'
						side='bottom'
						align='end'
					>
						<Link
							href={`/workouts/${workout.id}/start-workout`}
							className='ml-auto'
						>
							<Button variant='colored' size='sm'>
								<PlayCircleIcon className='w-5 h-5' />
							</Button>
						</Link>
					</Tooltip>
				)}
			</div>

			<EditWorkoutForm workout={workout} />
		</>
	)
}

export default WorkoutEditPage
