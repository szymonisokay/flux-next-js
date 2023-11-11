import { MenuIcon, XIcon } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from '@/components/ui/sheet'
import packageJson from '@/package.json'

import { NavigationRoutes } from './navigation-routes'

export const Sidebar = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='ghost' size='icon'>
					<MenuIcon className='w-5 h-5 ' />
				</Button>
			</SheetTrigger>
			<SheetContent side='left' className='flex flex-col gap-0 p-4'>
				<div className='flex items-center justify-between'>
					<Link
						prefetch={false}
						href='/'
						className='block text-xl font-semibold max-w-max'
					>
						Flux Exercises
					</Link>

					<SheetClose asChild>
						<Button variant='ghost' size='icon'>
							<XIcon className='w-5 h-5' />
						</Button>
					</SheetClose>
				</div>

				<NavigationRoutes />

				<div className='flex items-end justify-center text-sm text-secondary'>
					v {packageJson.version}
				</div>
			</SheetContent>
		</Sheet>
	)
}
