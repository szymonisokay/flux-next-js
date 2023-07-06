import getCurrentUser from '@/actions/getCurrentUser'
import { throwError } from '@/utils/error'
import { NextResponse } from 'next/server'

import prisma from '@/lib/prismadb'

export async function GET(request: Request) {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return throwError('Not authorized', 401)
	}

	const exercises = await prisma.exercise.findMany({
		select: {
			id: true,
			exercise_name: true,
		},
	})

	return NextResponse.json(exercises)
}
