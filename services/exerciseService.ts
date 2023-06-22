import { Exercise } from '@prisma/client'
import axios from 'axios'
import { PaginatedList } from '../interfaces/paginatedList.interface'

const getExercises = async () => {
	const { data } = await axios.get('/api/exercises')

	return data as PaginatedList<Exercise[]>
}

export default { getExercises }
