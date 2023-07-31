'use client'

import { WorkoutExercise } from '@prisma/client'
import { useState } from 'react'
import { ChangedExercise } from '../interfaces/exercises.interface'

interface WorkoutProviderProps {
	children: React.ReactNode
}

const WorkoutProvider: React.FC<WorkoutProviderProps> = ({ children }) => {
	const [selectedWorkout, setSelectedWorkout] =
		useState<WorkoutExercise | null>(null)
	const [changedExercise, setChangedExercise] = useState<ChangedExercise>(
		{} as ChangedExercise
	)

	const onChangeExercise = (rowId: string, exerciseId: string) => {
		setChangedExercise({ rowId, exerciseId })
	}

	return (
		<>
			{/* <AddWorkoutModal
				onSelectExercise={setSelectedWorkout}
				changedExercise={changedExercise}
			/> */}
			{/* <SelectExerciseModal
				exercise={selectedWorkout}
				onChangeExercise={onChangeExercise}
			/> */}

			{children}
		</>
	)
}

export default WorkoutProvider
