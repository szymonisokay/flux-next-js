import { redirect } from 'next/navigation'

import { PageHeader } from '@/components/page-header'
import { getProfile } from '@/lib/get-profile'

import { Suspense } from 'react'
import { WorkoutPageSkeleton } from './_components/workout-page-skeleton'
import { WorkoutWrapper } from './_components/workout-wrapper'

const WorkoutPage = async ({ params }: { params: { workoutId: string } }) => {
	const profile = await getProfile()

	if (!profile) {
		return redirect('/')
	}

	return (
		<>
			<PageHeader
				href='/workouts'
				title='Create workout'
				description='Fill in all required details'
			/>

			<Suspense fallback={<WorkoutPageSkeleton />}>
				<WorkoutWrapper
					profileId={profile.id}
					workoutId={params.workoutId}
				/>
			</Suspense>
		</>
	)
}

export default WorkoutPage
