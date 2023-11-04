import { Exercise, PrismaClient } from '@prisma/client'
import axios from 'axios'
import cloudinary from 'cloudinary'

const prisma = new PrismaClient()

const options = {
	method: 'GET',
	url: 'https://exercisedb.p.rapidapi.com/exercises',
	params: { limit: '10000' },
	headers: {
		'X-RapidAPI-Key': 'cc06dbdb51msh6b01de7fdf02424p1aaaa7jsna1ec294b0962',
		'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
	},
}

cloudinary.v2.config({
	cloud_name: 'dft6djfwi',
	api_key: '543791167697573',
	api_secret: 'iIEfJ1icfABQEso4_S7OOD3p93U',
})

async function main() {
	try {
		const response = await axios.request(options)
		const exercises: (Exercise & {
			secondaryMuscles: string[]
			instructions: string[]
		})[] = response.data

		exercises.forEach(async (exercise) => {
			const { id, gifUrl, instructions, secondaryMuscles, ...data } =
				exercise

			const imageUrl = `https://res.cloudinary.com/dft6djfwi/image/upload/v1/flux/${data.name.replace(
				/[^A-Z0-9]+/gi,
				'_'
			)}.gif`

			try {
				await prisma.exercise.create({
					data: {
						...data,
						gifUrl: imageUrl,
					},
				})

				console.log('exercise added')
			} catch (error) {
				console.log(`error !!!!`)
			}
		})
	} catch (error) {
		console.error(error)
	}
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
