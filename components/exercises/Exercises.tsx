'use client'

import { Exercise } from '@prisma/client'
import ExerciseCard from './ExerciseCard'

interface ExercisesProps {
	exercises: Exercise[]
}

const Exercises: React.FC<ExercisesProps> = ({ exercises }) => {
	return (
		<div className='flex flex-col w-full gap-4 '>
			{exercises.map((exercise) => (
				<ExerciseCard key={exercise.id} {...exercise} />
			))}
		</div>
	)
}

export default Exercises
