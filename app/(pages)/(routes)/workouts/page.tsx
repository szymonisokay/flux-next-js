import { redirectToSignIn } from '@clerk/nextjs'

import { PageHeader } from '@/components/page-header'
import { getProfile } from '@/lib/get-profile'
import { prisma } from '@/lib/prisma'

const WorkoutsPage = async () => {
	const profile = await getProfile()

	if (!profile) {
		return redirectToSignIn()
	}

	const workouts = await prisma.workout.findMany({
		where: {
			profileId: profile.id,
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

			{workouts.map((workout) => (
				<p>{workout.name}</p>
			))}
		</>
	)
}

export default WorkoutsPage
