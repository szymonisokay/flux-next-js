import { Navbar } from '@/components/navigation/navbar'
import { redirectToSignIn } from '@clerk/nextjs'
import { createProfile } from '../../lib/create-profile'
import { getProfile } from '../../lib/get-profile'

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
	await createProfile()

	const profile = await getProfile()

	if (!profile) {
		return redirectToSignIn()
	}

	return (
		<div className='w-full h-full px-4 pt-20'>
			<Navbar />
			{children}
		</div>
	)
}

export default DashboardLayout
