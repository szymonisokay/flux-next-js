import { LoaderIcon } from 'lucide-react'

const DashboardLoading = () => {
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<LoaderIcon className='animate-spin' />
		</div>
	)
}

export default DashboardLoading
