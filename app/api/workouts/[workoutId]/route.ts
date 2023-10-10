import { NextResponse } from 'next/server'

import { getProfile } from '@/lib/get-profile'
import { prisma } from '@/lib/prisma'

export async function PUT(
	req: Request,
	{ params }: { params: { workoutId: string } }
) {
	try {
		const profile = await getProfile()

		if (!profile) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

		const { name, description, date, duration, weight } = await req.json()

		if (!name || !date) {
			return new NextResponse('Required fields are missing', {
				status: 400,
			})
		}

		await prisma.workout.update({
			where: {
				id: params.workoutId,
			},
			data: {
				name,
				description,
				date,
				duration,
				weight,
			},
		})

		return NextResponse.json(true)
	} catch (error) {
		console.log('[WORKOUTS_PUT]', error)
		return new NextResponse('Internal server error', { status: 500 })
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { workoutId: string } }
) {
	try {
		const profile = await getProfile()

		if (!profile) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

		await prisma.workout.delete({
			where: {
				id: params.workoutId,
			},
		})

		return NextResponse.json(true)
	} catch (error) {
		console.log('[WORKOUTS_DELETE]', error)
		return new NextResponse('Internal server error', { status: 500 })
	}
}
