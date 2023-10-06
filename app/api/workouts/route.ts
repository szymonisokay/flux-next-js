import { NextResponse } from 'next/server'

import { getProfile } from '@/lib/get-profile'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
	try {
		const profile = await getProfile()

		if (!profile) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

		const { name, description, date } = await req.json()

		if (!name || !date) {
			return new NextResponse('Required fields are missing', {
				status: 400,
			})
		}

		const workout = await prisma.workout.create({
			data: {
				name,
				description,
				date,
				profileId: profile.id,
			},
		})

		return NextResponse.json(workout.id)
	} catch (error) {
		console.log('[WORKOUTS_POST]', error)
		return new NextResponse('Internal server error', { status: 500 })
	}
}
