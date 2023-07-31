import { Exercise } from '@prisma/client'
import axios from 'axios'

import { FormValues } from '@/components/modals/select-exercise-modal'
import { ExerciseName } from '@/interfaces/exercises.interface'
import { PaginatedList } from '@/interfaces/paginatedList.interface'

const getExercises = async (
	page: number,
	pageSize: number,
	filters: FormValues
) => {
	const { data } = await axios.get('/api/exercises', {
		params: {
			page,
			pageSize,
			...filters,
		},
	})

	return data as PaginatedList<Exercise[]>
}

const getExerciseNames = async () => {
	const { data } = await axios.get('/api/exercises/names')

	return data as ExerciseName[]
}

const getExercise = async (exerciseId: string) => {
	const { data } = await axios.get(`/api/exercises/${exerciseId}`)

	return data as Exercise
}

export default { getExercises, getExerciseNames, getExercise }
