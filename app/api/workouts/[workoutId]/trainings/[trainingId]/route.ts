import { NextResponse } from 'next/server'

import { getProfile } from '@/lib/get-profile'
import { prisma } from '@/lib/prisma'

type Params = {
	workoutId: string
	trainingId: string
}

export async function DELETE(req: Request, { params }: { params: Params }) {
	try {
		const profile = await getProfile()

		if (!profile) {
			return new NextResponse('Unathorized', { status: 401 })
		}

		await prisma.training.delete({
			where: {
				id: params.trainingId,
			},
		})

		return NextResponse.json(true)
	} catch (error) {
		console.log('[TRAINING_DELETE', error)
		return new NextResponse('Internal server error', { status: 500 })
	}
}
