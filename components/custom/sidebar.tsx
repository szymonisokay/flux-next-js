'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import Logo from '@/components/Logo'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
} from '@/components/ui/sheet'
import useSidebar from '@/hooks/use-sidebar'
import { cn } from '@/lib/utils'
import { RouteModel } from '@/models/route.model'

export const Sidebar = () => {
	const router = useRouter()
	const pathname = usePathname()
	const { isOpen, onClose } = useSidebar()

	const hideSidebar = () => {
		onClose()
		router.push('/')
	}

	const routes: RouteModel[] = [
		{
			href: '/',
			label: 'Dashboard',
			icon: Icons.dashboard,
			active: pathname === '/',
		},
		{
			href: '/calendar',
			label: 'Calendar',
			icon: Icons.calendarDays,
			active: pathname?.includes('/calendar') || false,
		},
		{
			href: '/workouts',
			label: 'Workouts',
			icon: Icons.flame,
			active: pathname?.includes('/workouts') || false,
		},
		{
			href: '/exercises',
			label: 'Exercises',
			icon: Icons.dumbbell,
			active: pathname === '/exercises',
		},
	]

	return (
		<Sheet open={isOpen}>
			<SheetContent side='left'>
				<SheetHeader className='flex-row items-center justify-between space-y-0'>
					<Logo
						src=''
						alt=''
						className='cursor-pointer w-28'
						onClick={hideSidebar}
					/>

					<SheetClose asChild>
						<Button variant='ghost' size='sm' onClick={onClose}>
							<Icons.close size={20} />
						</Button>
					</SheetClose>
				</SheetHeader>
				<div className='flex flex-col mt-10 gap-y-4'>
					{routes.map(({ href, icon: Icon, label, active }) => (
						<Link key={href} href={href} onClick={onClose}>
							<div
								className={cn(
									'group flex items-center gap-x-4  duration-150 hover:bg-gray-200/30 px-4 py-2 rounded-md',
									active
										? 'bg-foreground hover:bg-gray-900'
										: ''
								)}
							>
								<Icon
									size={18}
									className={cn(
										active ? 'text-white' : 'text-gray-950'
									)}
								/>

								<span
									className={cn(
										'duration-150 text-muted-foreground group-hover:text-primary',
										active
											? 'text-white group-hover:text-white'
											: 'text-muted-foreground'
									)}
								>
									{label}
								</span>
							</div>
						</Link>
					))}
				</div>
			</SheetContent>
		</Sheet>
	)
}
