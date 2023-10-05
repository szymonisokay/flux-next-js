import { MenuIcon, XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from '@/components/ui/sheet'

import Image from 'next/image'
import Link from 'next/link'
import { NavigationRoutes } from './navigation-routes'

export const Sidebar = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='ghost' size='icon'>
					<MenuIcon className='w-5 h-5 text-slate-800' />
				</Button>
			</SheetTrigger>
			<SheetContent side='left' className='p-4'>
				<div className='flex items-center justify-between'>
					<Link prefetch={false} href='/' className='block max-w-max'>
						<Image
							src='/images/logo.png'
							alt='logo'
							width={130}
							height={70}
						/>
					</Link>

					<SheetClose asChild>
						<Button variant='ghost' size='icon'>
							<XIcon className='w-5 h-5' />
						</Button>
					</SheetClose>
				</div>

				<NavigationRoutes />
			</SheetContent>
		</Sheet>
	)
}
