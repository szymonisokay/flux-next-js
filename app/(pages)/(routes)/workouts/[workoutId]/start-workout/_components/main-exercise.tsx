'use client'

import { Exercise, Set, Training } from '@prisma/client'

import { ExerciseCard } from '@/components/exercise/exercise-card'

import { ExerciseDetails } from './exercise-details'

type Props = {
	training: Training & {
		exercise: Exercise
		sets: Set[]
	}
}

export const MainExercise = ({ training }: Props) => {
	const { exercise } = training

	return (
		<div>
			<ExerciseCard highlight exercise={exercise}>
				<ExerciseCard.Details />
			</ExerciseCard>

			<ExerciseDetails training={training} />
		</div>
	)
}
