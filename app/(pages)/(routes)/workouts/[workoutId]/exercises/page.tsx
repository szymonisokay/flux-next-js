import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { getProfile } from '@/lib/get-profile'
import { prisma } from '@/lib/prisma'

import { Wrapper } from './_components/wrapper'

const WorkoutExercisesPage = async ({
	params,
}: {
	params: { workoutId: string }
}) => {
	const profile = await getProfile()

	if (!profile) {
		return redirect('/')
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

	if (!workout) {
		redirect('/workouts')
	}

	return (
		<>
			<PageHeader
				title='Workout exercises'
				description='Manage your exercises'
			/>

			{!workout.trainings.length ? (
				<div className='flex flex-col items-center justify-center w-full gap-2 mt-20'>
					<p className='text-lg font-semibold tracking-tight'>
						You have no exercises
					</p>
					<Link href={'exercises/add'}>
						<Button variant='colored' size='sm'>
							<PlusIcon className='w-4 h-4 mr-2' />
							Add new
						</Button>
					</Link>
				</div>
			) : (
				<Wrapper workout={workout} />
			)}
		</>
	)
}

export default WorkoutExercisesPage
