import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function POST(
	request: Request,
	{ params }: { params: { workoutId: string } }
) {
	const { exerciseId }: { exerciseId: string } = await request.json()

	const workoutExercise = await prisma.workoutExercise.create({
		data: {
			workoutId: params.workoutId,
			exerciseId,
			sets: [],
		},
	})

	return NextResponse.json(workoutExercise.id)
}
