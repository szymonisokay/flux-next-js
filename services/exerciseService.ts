import { Exercise } from '@prisma/client'
import axios from 'axios'
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

export default { getExercises }
