import prismadb from '@/libs/prismadb'
import { NextResponse } from 'next/server'

import getCurrentUser from '@/actions/getCurrentUser'
import { throwError } from '@/utils/error'

export async function POST(request: Request) {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return throwError('Not authorize', 401)
	}

	const { category, muscle } = await request.json()

	const query: any = {}

	if (category) {
		query.Category = {
			equals: category,
		}
	}

	if (muscle) {
		query.target = {
			is: {
				Primary: {
					has: muscle,
				},
			},
		}
	}

	const total = await prismadb.exercise.count({ where: query })
	const skip = Math.floor(Math.random() * total)

	const exercise = await prismadb.exercise.findFirst({
		where: query,
		take: 1,
		skip,
	})

	return NextResponse.json(exercise)
}
