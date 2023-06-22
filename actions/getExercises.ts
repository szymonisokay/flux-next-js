import { Exercise } from '@prisma/client'
import { PaginatedList } from '../interfaces/paginatedList.interface'
import getCurrentUser from './getCurrentUser'

import prisma from '@/libs/prismadb'

export interface ISearchParams {
	page: number
	pageSize: number
	query: string
}

export default async function getExercises({
	searchParams,
}: {
	searchParams: ISearchParams
}) {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		throw new Error('Not authorized')
	}

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
		take,
		skip,
	})
	const total = await prisma.exercise.count({ where: currentQuery })

	return { results: exercises, total } as PaginatedList<Exercise[]>
}
