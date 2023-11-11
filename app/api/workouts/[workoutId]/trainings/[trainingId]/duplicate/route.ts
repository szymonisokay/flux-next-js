import { NextResponse } from 'next/server'

import { getProfile } from '@/lib/get-profile'
import { prisma } from '@/lib/prisma'

type Params = {
	workoutId: string
	trainingId: string
}

export async function POST(req: Request, { params }: { params: Params }) {
	try {
		const profile = await getProfile()

		if (!profile) {
			return new NextResponse('Unathorized', { status: 401 })
		}

		const trainingToDuplicate = await prisma.training.findFirst({
			where: {
				id: params.trainingId,
				workoutId: params.workoutId,
			},
			include: {
				sets: true,
			},
		})

		if (!trainingToDuplicate) {
			return new NextResponse('Training not found', { status: 404 })
		}

		const { id, createdAt, updatedAt, sets, ...training } =
			trainingToDuplicate

		await prisma.training.create({
			data: {
				...training,
				sets: {
					createMany: {
						data: sets.map((set) => ({
							reps: set.reps,
							weight: set.weight,
						})),
					},
				},
			},
		})

		return NextResponse.json(true)
	} catch (error) {
		console.log('[TRAINING_DELETE', error)
		return new NextResponse('Internal server error', { status: 500 })
	}
}
