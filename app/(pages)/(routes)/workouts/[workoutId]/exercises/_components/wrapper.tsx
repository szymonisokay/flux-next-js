'use client'

import { ExerciseCard } from '@/components/exercise/exercise-card'
import { FloatingActionButton } from '@/components/floating-action-button'
import { Exercise, Set, Training, Workout } from '@prisma/client'
import { PlusIcon } from 'lucide-react'

type Props = {
	workout: Workout & {
		trainings: (Training & {
			exercise: Exercise
			sets: Set[]
		})[]
	}
}

export const Wrapper = ({ workout }: Props) => {
	return (
		<>
			<FloatingActionButton
				href='exercises/add'
				label='Add exercise'
				icon={PlusIcon}
			/>
			<div className='grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3'>
				{workout.trainings.map((training) => (
					<ExerciseCard
						key={training.id}
						exercise={training.exercise}
						slot={<ExerciseCard.Menu trainingId={training.id} />}
					>
						<ExerciseCard.Details />
						<ExerciseCard.WorkoutInfo
							duration={training.duration}
							sets={training.sets}
						/>
					</ExerciseCard>
				))}
			</div>
		</>
	)
}
