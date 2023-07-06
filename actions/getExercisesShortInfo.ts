import prisma from '@/lib/prismadb'
import { ExerciseShortInfo } from '../interfaces/exercises.interface'
import { PaginatedList } from '../interfaces/paginatedList.interface'
import { ISearchParams } from './getExercises'

export default async function getExercisesShortInfo(
	searchParams: ISearchParams
) {
	const { page, pageSize, query } = searchParams

	const take = +pageSize || 20
	const skip = (page - 1) * pageSize || 0

	const currentQuery: any = {}

	if (query) {
		currentQuery.exercise_name = {
			contains: query,
			mode: 'insensitive',
		}
	}

	const exercises = await prisma.exercise.findMany({
		where: currentQuery,
		select: {
			id: true,
			exercise_name: true,
			target: true,
			Category: true,
			Difficulty: true,
			videoURL: true,
		},
		take,
		skip,
	})
	const total = await prisma.exercise.count({ where: currentQuery })

	return { results: exercises, total: total } as PaginatedList<
		ExerciseShortInfo[]
	>
}
