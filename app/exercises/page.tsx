import getCurrentUser from '../../actions/getCurrentUser'
import Loading from '../loading'
import ExercisesClient from './ExercisesClient'

const ExercisesPage = async () => {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return <Loading />
	}

	return <ExercisesClient />
}

export default ExercisesPage
