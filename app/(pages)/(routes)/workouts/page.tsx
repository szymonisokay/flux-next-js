import prismadb from '@/lib/prismadb'

import getCurrentUser from '../../../../actions/getCurrentUser'
import { WorkoutsClient } from './client'

const WorkoutsPage = async () => {
	const currentUser = await getCurrentUser()
	const workouts = await prismadb.workout.findMany({
		where: {
			userId: currentUser?.id,
		},
	})

	return <WorkoutsClient workouts={workouts} />
}

export default WorkoutsPage
