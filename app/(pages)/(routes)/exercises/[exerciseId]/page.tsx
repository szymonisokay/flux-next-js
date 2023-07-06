import getExerciseById from '@/actions/getExerciseById'
import getSimilarExercises from '@/actions/getSimilarExercises'

import SingleExerciseClient from './single-exercise-client'

interface IParams {
	exerciseId?: string
}

const SingleExercisePage = async ({ params }: { params: IParams }) => {
	const exercise = await getExerciseById(params)
	const similarExercises = await getSimilarExercises(
		exercise?.target?.Primary[0]
	)

	return (
		<SingleExerciseClient
			exercise={exercise}
			similarExercises={similarExercises}
		/>
	)
}

export default SingleExercisePage
