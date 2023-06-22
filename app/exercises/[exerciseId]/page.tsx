import getExerciseById from '../../../actions/getExerciseById'
import getSimilarExercises from '../../../actions/getSimilarExercises'
import SingleExerciseClient from './SingleExerciseClient'

interface IParams {
	exerciseId?: string
}

const SingleExercisePage = async ({ params }: { params: IParams }) => {
	const exercise = await getExerciseById(params)
	const similarExercises = await getSimilarExercises(
		exercise?.target?.Primary[0]
	)

	return (
		<div className='px-4 pt-20 pb-4'>
			<SingleExerciseClient
				exercise={exercise}
				similarExercises={similarExercises}
			/>
		</div>
	)
}

export default SingleExercisePage
