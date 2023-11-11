'use client'

import { ExerciseCard } from '@/components/exercise/exercise-card'
import { Exercise } from '@prisma/client'

type Props = {
	exercises: Exercise[]
}

export const Wrapper = ({ exercises }: Props) => {
	return (
		<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
			{exercises.map((exercise) => (
				<ExerciseCard key={exercise.id} exercise={exercise}>
					<ExerciseCard.Details />
					<ExerciseCard.SelectButton />
				</ExerciseCard>
			))}
		</div>
	)
}
