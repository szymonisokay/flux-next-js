'use client'

import { PlusIcon } from 'lucide-react'

import { ExerciseCard } from '@/components/exercise/exercise-card'
import { FloatingActionButton } from '@/components/floating-action-button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Exercise, Set, Training } from '@prisma/client'

type Props = {
	trainings: (Training & {
		exercise: Exercise
		sets: Set[]
	})[]
}

export const ExercisesList = ({ trainings }: Props) => {
	return (
		<>
			<FloatingActionButton
				href='exercises/add'
				label='Add exercise'
				icon={PlusIcon}
			/>
			<ScrollArea className='-mr-3'>
				<div className='grid grid-cols-1 gap-4 mr-3 sm:grid-cols-2 lg:grid-cols-3'>
					{trainings.map((training) => (
						<ExerciseCard
							key={training.id}
							exercise={training.exercise}
							slot={<ExerciseCard.Menu training={training} />}
						>
							<ExerciseCard.Details />
							<ExerciseCard.WorkoutInfo
								duration={training.duration}
								sets={training.sets}
							/>
						</ExerciseCard>
					))}
				</div>
			</ScrollArea>
		</>
	)
}
