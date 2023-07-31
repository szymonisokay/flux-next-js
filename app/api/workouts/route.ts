import prisma from '@/lib/prismadb'
import { Workout } from '@prisma/client'
import { NextResponse } from 'next/server'
import getCurrentUser from '../../../actions/getCurrentUser'
import { MessageResponse } from '../../../interfaces/messageResponse.interface'
import { throwError } from '../../../utils/error'

export async function POST(request: Request) {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return throwError('Not authorized', 401)
	}

	const { name, date, time } = await request.json()

	const workout = await prisma.workout.create({
		data: {
			name,
			date,
			time,
			userId: currentUser.id,
		},
	})

	return NextResponse.json({
		message: 'Workout created',
		result: workout,
	} as MessageResponse<Workout>)
}
