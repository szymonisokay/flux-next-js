import { redirect } from 'next/navigation'

import { createProfile } from '@/lib/create-profile'
import { getProfile } from '@/lib/get-profile'

import { Suspense } from 'react'
import { NextExercise } from './_components/next-exercise'

const DashboardPage = async () => {
	await createProfile()

	const profile = await getProfile()

	if (!profile) {
		return redirect('/')
	}

	return (
		<>
			<Suspense fallback={<NextExercise.Skeleton />}>
				<NextExercise profileId={profile.id} />
			</Suspense>
		</>
	)
}

export default DashboardPage
