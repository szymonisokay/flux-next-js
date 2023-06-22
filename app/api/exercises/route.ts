import { NextResponse } from 'next/server'
import getCurrentUser from '../../../actions/getCurrentUser'
import { throwError } from '../../../utils/error'

import prisma from '@/libs/prismadb'
import { Exercise } from '@prisma/client'
import { PaginatedList } from '../../../interfaces/paginatedList.interface'

export async function GET(request: Request) {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return throwError('Not authorized', 401)
	}

	const exercises = await prisma.exercise.findMany({ take: 30 })

	return NextResponse.json({
		results: exercises,
		total: exercises.length,
	} as PaginatedList<Exercise[]>)
}
