'use client'

import { useEffect, useMemo, useState } from 'react'
import { ExerciseName } from '../interfaces/exercises.interface'
import exerciseService from '../services/exerciseService'

interface UseExercisesProps {
	exerciseId?: string | null
}

const useExercises = ({ exerciseId }: UseExercisesProps) => {
	const [exercises, setExercises] = useState<ExerciseName[]>([])

	const fetchExercises = async () => {
		const exercises = await exerciseService.getExerciseNames()

		setExercises(exercises)
	}

	const exerciseName = useMemo(() => {
		return exercises.find((exercise) => exercise.id === exerciseId)
			?.exercise_name
	}, [exercises, exerciseId])

	useEffect(() => {
		fetchExercises()
	}, [])

	return { exerciseName }
}

export default useExercises
