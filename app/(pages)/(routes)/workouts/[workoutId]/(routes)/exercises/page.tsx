import prisma from '@/lib/prismadb'
import { redirect } from 'next/navigation'
import { WorkoutExercisesClient } from './client'

export const revalidate = 0

const WorkoutExercisesPage = async ({
	params,
}: {
	params: { workoutId: string }
}) => {
	const workout = await prisma.workout.findUnique({
		where: {
			id: params.workoutId,
		},
		include: {
			exercises: {
				include: {
					exercise: true,
				},
			},
		},
	})

	console.log(workout)

	const bodyPartList = await prisma.exerciseBodyPart.findMany()
	const targetList = await prisma.exerciseMuscle.findMany()
	const equipmentList = await prisma.exerciseEquipment.findMany()

	if (!workout) {
		redirect('/workouts')
	}

	return (
		<WorkoutExercisesClient
			workout={workout}
			workoutId={params.workoutId}
			bodyPartList={bodyPartList.map((value) => value.name)}
			targetList={targetList.map((value) => value.name)}
			equipmentList={equipmentList.map((value) => value.name)}
		/>
	)
}

export default WorkoutExercisesPage
