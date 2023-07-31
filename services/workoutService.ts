import { SetModel, Workout } from '@prisma/client'
import axios from 'axios'
import { WorkoutFormValues } from '../app/(pages)/(routes)/workouts/[workoutId]/client'
import { MessageResponse } from '../interfaces/messageResponse.interface'

const createWorkout = async (workout: WorkoutFormValues) => {
	return (await axios.post('/api/workouts', workout))
		.data as MessageResponse<Workout>
}

const saveWorkoutExercise = async (workoutId: string, exerciseId: string) => {
	const { data } = await axios.post<string>(
		`/api/workouts/${workoutId}/exercises`,
		{
			exerciseId,
		}
	)

	return data
}

const updateWorkoutExerciseSets = async (id: string, sets: SetModel[]) => {
	const { data } = await axios.put(`/api/workout-exercises/${id}`, {
		sets,
	})

	return data
}

export default { createWorkout, saveWorkoutExercise, updateWorkoutExerciseSets }
