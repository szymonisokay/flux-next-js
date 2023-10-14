import { NextResponse } from 'next/server'

import { getProfile } from '@/lib/get-profile'
import { prisma } from '@/lib/prisma'

export async function POST(
	req: Request,
	{ params }: { params: { workoutId: string } }
) {
	try {
		const profile = await getProfile()

		if (!profile) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

		const workoutToDuplicate = await prisma.workout.findFirst({
			where: {
				id: params.workoutId,
			},
			include: {
				trainings: {
					include: {
						sets: true,
					},
				},
			},
		})

		if (!workoutToDuplicate) {
			return new NextResponse('Workout not found', { status: 404 })
		}

		const { id, createdAt, updatedAt, ...workout } = workoutToDuplicate

		await prisma.workout.create({
			data: {
				...workout,
				name: `${workout.name} - duplicated`,
				completed: false,
				trainings: {
					create: workout.trainings.map(
						({ duration, exerciseId, sets }) => ({
							duration,
							exerciseId,
							sets: {
								createMany: {
									data: sets.map(({ reps, weight }) => ({
										reps,
										weight,
										completed: false,
									})),
								},
							},
						})
					),
				},
			},
		})

		return NextResponse.json(true)
	} catch (error) {
		console.log('[WORKOUTS_PUT]', error)
		return new NextResponse('Internal server error', { status: 500 })
	}
}
