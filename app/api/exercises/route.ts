import { Exercise } from '@prisma/client'
import { NextResponse } from 'next/server'

import getCurrentUser from '@/actions/getCurrentUser'
import { PaginatedList } from '@/interfaces/paginatedList.interface'
import prisma from '@/lib/prismadb'
import { throwError } from '@/utils/error'
import { managePagination } from '@/utils/managePagination'

export async function GET(request: Request) {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return throwError('Not authorized', 401)
	}
	const { searchParams } = new URL(request.url)

	const page = searchParams.get('page')
	const pageSize = searchParams.get('pageSize')
	const name = searchParams.get('name') || undefined
	const bodyPart = searchParams.get('bodyPart') || undefined
	const target = searchParams.get('target') || undefined
	const equipment = searchParams.get('equipment') || undefined

	const { take, skip } = managePagination(page, pageSize)

	const currentQuery: any = {}

	currentQuery.name = {
		contains: name,
		mode: 'insensitive',
	}

	currentQuery.bodyPart = bodyPart
	currentQuery.target = target
	currentQuery.equipment = equipment

	const exercises = await prisma.exercise.findMany({
		where: currentQuery,
		take,
		skip,
	})
	const total = await prisma.exercise.count({
		where: currentQuery,
	})

	return NextResponse.json({
		results: exercises,
		total: total,
	} as PaginatedList<Exercise[]>)
}
