import { redirect } from 'next/navigation'
import getCurrentUser from '../../../../actions/getCurrentUser'
import LoginClient from './LoginClient'

const LoginPage = async () => {
	const currentUser = await getCurrentUser()

	if (currentUser) {
		redirect('/')
	}

	return <LoginClient />
}

export default LoginPage
