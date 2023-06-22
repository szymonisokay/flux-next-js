import { Workout } from '@prisma/client'
import axios from 'axios'
import { MessageResponse } from '../interfaces/messageResponse.interface'

const createWorkout = async (workout: Workout) => {
	return (await axios.post('/api/workouts', workout))
		.data as MessageResponse<Workout>
}

export default { createWorkout }
