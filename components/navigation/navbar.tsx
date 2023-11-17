import { BellIcon } from 'lucide-react'
import { Suspense } from 'react'

import { Sidebar } from '@/components/navigation/sidebar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

import { UserView } from './user-view'

export const Navbar = () => {
	return (
		<header className='fixed top-0 left-0 z-50 flex items-center justify-between w-full px-4 py-3 border-b backdrop-blur-sm'>
			<Sidebar />

			<div className='flex items-center gap-x-2'>
				<Button variant='ghost' size='icon'>
					<BellIcon className='w-5 h-5 ' />
				</Button>

				<Suspense
					fallback={<Skeleton className='rounded-full w-7 h-7' />}
				>
					<UserView />
				</Suspense>
			</div>
		</header>
	)
}
