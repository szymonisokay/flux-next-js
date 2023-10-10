import { redirectToSignIn } from '@clerk/nextjs'

import { PageHeader } from '@/components/page-header'
import { getProfile } from '@/lib/get-profile'
import { prisma } from '@/lib/prisma'

import { WorkoutsWrapper } from './_components/workouts-wrapper'

const WorkoutsPage = async () => {
	const profile = await getProfile()

	if (!profile) {
		return redirectToSignIn()
	}

	const workouts = await prisma.workout.findMany({
		where: {
			profileId: profile.id,
		},
		orderBy: {
			date: 'asc',
		},
	})

	return (
		<>
			<PageHeader
				title='Workouts'
				description='List of your workouts'
				actionLabel='Add workout'
				actionHref='/workouts/new'
			/>

			<WorkoutsWrapper workouts={workouts} />
		</>
	)
}

export default WorkoutsPage
