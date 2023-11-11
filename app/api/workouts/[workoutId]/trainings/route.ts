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
			return new NextResponse('Unathorized', { status: 401 })
		}

		const { exerciseId, duration, sets } = await req.json()

		if (!exerciseId) {
			return new NextResponse('Exercise not selected', { status: 400 })
		}

		await prisma.training.create({
			data: {
				duration,
				exerciseId,
				workoutId: params.workoutId,
				sets: {
					createMany: {
						data: sets,
					},
				},
			},
		})

		return NextResponse.json(true)
	} catch (error) {
		console.log('[WORKOUT_TRAININGS_POST]', error)
		return new NextResponse('Internal server error', { status: 500 })
	}
}
