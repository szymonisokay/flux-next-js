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
			return new NextResponse('Unauthenticated', { status: 401 })
		}

		const { completed, setId } = await req.json()

		if (!setId) {
			return new NextResponse('Fields are required', { status: 400 })
		}

		const set = await prisma.set.findFirst({
			where: {
				id: setId,
				trainingId: params.trainingId,
			},
		})

		if (!set) {
			return new NextResponse('Set does not exist', { status: 404 })
		}

		await prisma.set.update({
			where: {
				id: set.id,
			},
			data: {
				completed,
			},
		})

		const training = await prisma.training.findFirst({
			where: {
				id: params.trainingId,
			},
			include: {
				sets: true,
			},
		})

		if (!training) {
			return new NextResponse('Training not found', { status: 404 })
		}

		const trainingCompleted = training.sets.every((set) => set.completed)

		if (trainingCompleted) {
			await prisma.training.update({
				where: {
					id: training.id,
				},
				data: {
					completed: true,
				},
			})
		}

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
		return new NextResponse('Internal server error', { status: 500 })
	}
}
