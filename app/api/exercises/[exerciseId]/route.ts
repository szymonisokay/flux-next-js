import { NextResponse } from 'next/server'

import getCurrentUser from '@/actions/getCurrentUser'
import prisma from '@/lib/prismadb'

export async function GET(
	request: Request,
	{ params }: { params: { exerciseId: string } }
) {
	const currentUser = await getCurrentUser()

	if (!currentUser) return

	const exercise = await prisma.exercise.findFirst({
		where: { id: params.exerciseId },
	})

	return NextResponse.json(exercise)
}
