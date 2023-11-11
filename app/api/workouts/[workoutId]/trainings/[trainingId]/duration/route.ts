import { NextResponse } from 'next/server'

import { getProfile } from '@/lib/get-profile'
import { prisma } from '@/lib/prisma'

type Params = {
	workoutId: string
	trainingId: string
}

export async function PUT(req: Request, { params }: { params: Params }) {
	try {
		const profile = await getProfile()

		if (!profile) {
			return new NextResponse('Not authenticated', { status: 401 })
		}

		const { completed } = await req.json()

		await prisma.training.update({
			where: {
				id: params.trainingId,
			},
			data: {
				completed,
			},
		})

		const workout = await prisma.workout.findFirst({
			where: {
				id: params.workoutId,
				profileId: profile.id,
			},
			include: {
				trainings: true,
			},
		})

		if (!workout) {
			return new NextResponse('Workout not found', { status: 404 })
		}

		const areAllTrainingsCompleted = workout.trainings.every(
			(training) => training.completed
		)

		if (areAllTrainingsCompleted) {
			await prisma.workout.update({
				where: {
					id: workout.id,
				},
				data: {
					completed: true,
				},
			})
		}

		return NextResponse.json(true)
	} catch (error) {
		console.log('[TRAINING_ID_DURATION_PUT]', error)
		return new NextResponse('Internal server error', { status: 500 })
	}
}
