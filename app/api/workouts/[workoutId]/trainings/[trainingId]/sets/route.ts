import { NextResponse } from 'next/server'

import { getProfile } from '@/lib/get-profile'
import { prisma } from '@/lib/prisma'

export async function PUT(
	req: Request,
	{ params }: { params: { trainingId: string } }
) {
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

		return NextResponse.json(true)
	} catch (error) {
		return new NextResponse('Internal server error', { status: 500 })
	}
}
