import prisma from '@/libs/prismadb'

interface IParams {
	exerciseId?: string
}

export default async function getExerciseById(params: IParams) {
	const { exerciseId } = params

	if (!exerciseId?.match(/^[0-9a-fA-F]{24}$/)) {
		return null
	}

	const exercise = await prisma.exercise.findUnique({
		where: { id: exerciseId },
	})

	return exercise
}
