import { Exercise } from '@prisma/client'
import axios from 'axios'
import {
	ExerciseName,
	RandomExerciseData,
} from '../interfaces/exercises.interface'
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

const getRandomExercise = async (randomExerciseData: RandomExerciseData) => {
	const { data } = await axios.post('/api/exercises/randomExercise', {
		...randomExerciseData,
	})

	return data as Exercise
}

export default { getExercises, getExerciseNames, getRandomExercise }
