import { NextResponse } from 'next/server'
import getCurrentUser from '../../../actions/getCurrentUser'
import { throwError } from '../../../utils/error'

import prisma from '@/libs/prismadb'
import { Exercise } from '@prisma/client'
import { PaginatedList } from '../../../interfaces/paginatedList.interface'
import { managePagination } from '../../../utils/managePagination'

export async function GET(request: Request) {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return throwError('Not authorized', 401)
	}
	const { searchParams } = new URL(request.url)

	const page = searchParams.get('page')
	const pageSize = searchParams.get('pageSize')
	const query = searchParams.get('query')

	const { take, skip } = managePagination(page, pageSize)

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

	return NextResponse.json({
		results: exercises,
		total: total,
	} as PaginatedList<Exercise[]>)
}
