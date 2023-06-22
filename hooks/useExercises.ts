'use client'

import { useMemo } from 'react'
import { ExerciseShortInfo } from '../interfaces/exercises.interface'

interface UseExercisesProps {
	exercises: ExerciseShortInfo[]
	exerciseId?: string | null
}

const useExercises = ({ exercises, exerciseId }: UseExercisesProps) => {
	const exerciseName = useMemo(() => {
		return exercises.find((exercise) => exercise.id === exerciseId)
			?.exercise_name
	}, [exerciseId])

	return { exerciseName }
}

export default useExercises
