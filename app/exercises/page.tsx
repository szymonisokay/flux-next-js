import getCurrentUser from '../../actions/getCurrentUser'
import getExercises, { ISearchParams } from '../../actions/getExercises'
import Loading from '../loading'
import ExercisesClient from './ExercisesClient'

const ExercisesPage = async ({
	searchParams,
}: {
	searchParams: ISearchParams
}) => {
	const currentUser = await getCurrentUser()
	const exercises = await getExercises({ searchParams })

	if (!currentUser) {
		return <Loading />
	}

	return <ExercisesClient exercises={exercises} />
}

export default ExercisesPage
