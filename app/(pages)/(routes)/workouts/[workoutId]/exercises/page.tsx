import { PlusIcon } from 'lucide-react'

import { ExerciseCardWithDetails } from '@/components/exercise/exercise-card-with-details'
import { PageHeader } from '@/components/page-header'
import { Tooltip } from '@/components/tooltip'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import { redirectToSignIn } from '@clerk/nextjs'
import Link from 'next/link'
import { getProfile } from '../../../../../../lib/get-profile'

const WorkoutExercisesPage = async ({
	params,
}: {
	params: { workoutId: string }
}) => {
	const profile = await getProfile()

	if (!profile) {
		return redirectToSignIn()
	}

	const workout = await prisma.workout.findUnique({
		where: {
			id: params.workoutId,
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

	return (
		<>
			<div className='flex items-center justify-between mb-4 gap-x-4'>
				<PageHeader
					title='Workout exercises'
					description='Manage your exercises'
				/>

				<Tooltip label='Add exercise'>
					<Link replace href={'exercises/add'}>
						<Button variant='colored' size='sm'>
							<PlusIcon className='w-5 h-5' />
						</Button>
					</Link>
				</Tooltip>
			</div>

			<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
				{workout?.trainings.map((training) => (
					<ExerciseCardWithDetails
						key={training.id}
						training={training}
					/>
				))}
			</div>
		</>
	)
}

export default WorkoutExercisesPage
