'use client'

import { ExerciseCard } from '@/components/exercise/exercise-card'
import { Heading } from '@/components/heading'
import { Separator } from '@/components/ui/separator'
import { Exercise, Set, Training } from '@prisma/client'
import { Fragment } from 'react'

type Props = {
	trainings: (Training & {
		exercise: Exercise
		sets: Set[]
	})[]
}

export const NextExercises = ({ trainings }: Props) => {
	return (
		<>
			<Separator className='my-4' />
			<Heading title='Next exercise' />

			<div className='flex flex-col gap-4 mt-4'>
				{trainings.map((training, index) => (
					<Fragment key={training.id}>
						{index > 0 && (
							<ExerciseCard exercise={training.exercise}>
								<ExerciseCard.Details />
								<ExerciseCard.WorkoutInfo
									duration={training.duration}
									sets={training.sets}
								/>
							</ExerciseCard>
						)}
					</Fragment>
				))}
			</div>
		</>
	)
}
