import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import { PageHeader } from '@/components/page-header'
import { getProfile } from '@/lib/get-profile'

import { ExercisesPageSkeleton } from './_components/exercises-page-skeleton'
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

	return (
		<>
			<PageHeader
				title='Workout exercises'
				description='Manage your exercises'
			/>

			<Suspense fallback={<ExercisesPageSkeleton />}>
				<Wrapper workoutId={params.workoutId} />
			</Suspense>
		</>
	)
}

export default WorkoutExercisesPage
