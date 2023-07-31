import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const { sets } = await request.json()

	await prisma.workoutExercise.update({
		where: {
			id: params.id,
		},
		data: {
			sets,
		},
	})
	return NextResponse.json(true)
}
