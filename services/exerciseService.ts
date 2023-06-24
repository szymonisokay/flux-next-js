import { Exercise } from '@prisma/client'
import axios from 'axios'
import { ExerciseName } from '../interfaces/exercises.interface'
import { PaginatedList } from '../interfaces/paginatedList.interface'

const getExercises = async (page: number, pageSize: number, query: string) => {
	const { data } = await axios.get('/api/exercises', {
		params: {
			page,
			pageSize,
			query,
		},
	})

	return data as PaginatedList<Exercise[]>
}

const getExerciseNames = async () => {
	const { data } = await axios.get('/api/exercises/names')

	return data as ExerciseName[]
}

export default { getExercises, getExerciseNames }
