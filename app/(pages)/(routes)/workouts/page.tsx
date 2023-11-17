import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import { PageHeader } from '@/components/page-header'
import { getProfile } from '@/lib/get-profile'

import { WorkoutsListSkeleton } from './_components/workouts-list-skeleton'
import { WorkoutsWrapper } from './_components/workouts-wrapper'

export const dynamic = 'force-dynamic'

const WorkoutsPage = async () => {
	const profile = await getProfile()

	if (!profile) {
		return redirect('/')
	}

	return (
		<>
			<PageHeader
				href='/'
				title='Workouts'
				description='List of your workouts'
			/>

			<Suspense fallback={<WorkoutsListSkeleton />}>
				<WorkoutsWrapper profileId={profile.id} />
			</Suspense>
		</>
	)
}

export default WorkoutsPage
