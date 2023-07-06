import axios from 'axios'

import prisma from '@/lib/prismadb'
import { Exercise } from '@prisma/client'

async function main() {
	const { data: exercises } = await axios.request<Exercise[]>({})

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
