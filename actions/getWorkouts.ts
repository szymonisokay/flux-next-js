import prisma from '@/lib/prismadb'
import getCurrentUser from './getCurrentUser'

export default async function getWorkouts() {
	const currentUser = getCurrentUser()

	if (!currentUser) {
		throw new Error('Not authorized')
	}

	const workouts = await prisma.workout.findMany()

	return workouts
}
