import { redirectToSignIn } from '@clerk/nextjs'

import { ExerciseCard } from '@/components/exercise/exercise-card'
import { AddExerciseForm } from '@/components/forms/add-exercise-form'
import { PageHeader } from '@/components/page-header'
import { getProfile } from '@/lib/get-profile'
import { prisma } from '@/lib/prisma'
import { Heading } from '../../../../../../../components/heading'

type Params = {
	searchParams: {
		bodyPart?: string
		equpiment?: string
		target?: string
		exercisesNumber?: string
		generate?: boolean
	}
}

const AddExercisePage = async ({ searchParams }: Params) => {
	const profile = await getProfile()

	if (!profile) {
		return redirectToSignIn()
	}

	const { generate, exercisesNumber, ...params } = searchParams

	const exercisesCount = await prisma.exercise.count({
		where: params,
	})
	const skip = Math.floor(Math.random() * exercisesCount)

	const exercises = await prisma.exercise.findMany({
		where: params,
		take: Number(exercisesNumber) || 3,
		skip,
	})

	return (
		<>
			<PageHeader
				title='Add exercise'
				description='Generate and add exercise to your workout'
			/>

			<AddExerciseForm />

			{!!generate && (
				<div className='mt-4'>
					<Heading
						title='Exercises'
						description='Select one exercise and add it to workout'
					/>
					<div className='grid grid-cols-1 gap-4 pt-4 mt-4 border-t sm:grid-cols-2 lg:grid-cols-3'>
						{exercises.map((exercise) => (
							<ExerciseCard
								key={exercise.id}
								exercise={exercise}
							/>
						))}
					</div>
				</div>
			)}
		</>
	)
}

export default AddExercisePage
