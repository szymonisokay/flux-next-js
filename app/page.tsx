import getCurrentUser from '../actions/getCurrentUser'
import Loading from './loading'

export default async function Home() {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return <Loading />
	}

	return <div className='w-full h-full px-4 pt-20'>dashboard</div>
}
