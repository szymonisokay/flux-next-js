import { NextResponse } from 'next/server'

import { getProfile } from '@/lib/get-profile'
import { prisma } from '@/lib/prisma'
import { Set } from '@prisma/client'

type Params = {
	workoutId: string
}

type BodyProps = {
	exerciseId: string
	duration: string
	sets: Set[]
	trainingId?: string
}

export async function POST(req: Request, { params }: { params: Params }) {
	try {
		const profile = await getProfile()

		if (!profile) {
			return new NextResponse('Unathorized', { status: 401 })
		}

		const { exerciseId, duration, sets }: BodyProps = await req.json()

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

export async function PUT(req: Request, { params }: { params: Params }) {
	try {
		const profile = await getProfile()

		if (!profile) {
			return new NextResponse('Unathorized', { status: 401 })
		}

		let { duration, sets, trainingId }: BodyProps = await req.json()

		if (!trainingId) {
			return new NextResponse('TrainingId not provided', { status: 400 })
		}

		for (const set of sets) {
			if (set.id) {
				await prisma.set.update({
					where: {
						id: set.id,
					},
					data: {
						...set,
					},
				})
			} else {
				await prisma.set
					.create({
						data: {
							...set,
							trainingId,
						},
					})
					.then((data) => {
						sets = sets.map((newSet) => ({
							...newSet,
							id:
								newSet.order === data.order
									? data.id
									: newSet.id,
						}))
					})
			}
		}

		const existingSets = await prisma.set.findMany({
			where: {
				trainingId: trainingId,
			},
		})

		const setsToDelete = existingSets.filter(
			(set) => !sets.some((updatedSet) => updatedSet.id === set.id)
		)

		await Promise.all(
			setsToDelete.map((set) =>
				prisma.set.delete({
					where: {
						id: set.id,
					},
				})
			)
		)

		await prisma.training.update({
			where: {
				id: trainingId,
			},
			data: {
				duration,
			},
		})

		return NextResponse.json(true)
	} catch (error) {
		console.log('[WORKOUT_TRAININGS_PUT]', error)
		return new NextResponse('Internal server error', { status: 500 })
	}
}
