import ExercisesClient from './exercise-client'
import Loading from './loading'

import getCurrentUser from '@/actions/getCurrentUser'

const ExercisesPage = async () => {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return <Loading />
	}

	return <ExercisesClient />
}

export default ExercisesPage
