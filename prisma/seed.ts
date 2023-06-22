import axios from 'axios'
import { apiOptions } from '../actions/getExercises'

import { Exercise } from '@prisma/client'
import prisma from '../libs/prismadb'

async function main() {
	const { data: exercises } = await axios.request<Exercise[]>(apiOptions)

	const data = exercises.map((exercise) => {
		const { id, ...rest } = exercise
		return rest
	})

	await prisma.exercise.createMany({ data })
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
