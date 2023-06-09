import prisma from '@/libs/prismadb'

export default async function getSimilarExercises(muscle?: string | null) {
	if (!muscle) {
		return null
	}

	const query: any = {
		target: {
			is: {
				Primary: {
					has: muscle,
				},
			},
		},
	}

	const total = await prisma.exercise.count({ where: query })

	const exercises = await prisma.exercise.findMany({
		where: query,
		skip: Math.floor(Math.random() * total),
		take: 5,
	})

	return exercises
}
