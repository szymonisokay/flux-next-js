import prisma from '@/lib/prismadb'
import { WorkoutClient } from './client'

export const revalidate = 0

const WorkoutPage = async ({ params }: { params: { workoutId: string } }) => {
	const workout = params.workoutId.match(/^[0-9a-fA-F]{24}$/)
		? await prisma.workout.findUnique({
				where: {
					id: params.workoutId,
				},
				include: {
					exercises: true,
					images: true,
				},
		  })
		: null

	const bodyPartList = await prisma.exerciseBodyPart.findMany()
	const targetList = await prisma.exerciseMuscle.findMany()
	const equipmentList = await prisma.exerciseEquipment.findMany()

	return (
		<WorkoutClient
			workout={workout}
			bodyPartList={bodyPartList.map((value) => value.name)}
			targetList={targetList.map((value) => value.name)}
			equipmentList={equipmentList.map((value) => value.name)}
		/>
	)
}

export default WorkoutPage
