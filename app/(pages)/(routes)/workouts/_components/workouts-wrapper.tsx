import { Workout } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { WorkoutsList } from './workouts-list'

type Props = {
	profileId: string
}

export const WorkoutsWrapper = async ({ profileId }: Props) => {
	const workouts = await prisma.workout.findMany({
		where: {
			profileId: profileId,
		},
		orderBy: {
			date: 'asc',
		},
	})

	await new Promise((resolve) => setTimeout(resolve, 5000))

	const workoutsByDate = workouts.reduce((result, item) => {
		const date = item.date

		if (!result[date]) {
			result[date] = []
		}

		result[date].push(item)

		return result
	}, {} as { [key: string]: Workout[] })

	return <WorkoutsList workoutsByDate={workoutsByDate} />
}
