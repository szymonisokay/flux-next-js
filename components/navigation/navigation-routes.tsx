'use client'

import { FlameIcon, LayoutDashboardIcon } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const routes = [
	{
		label: 'Dashboard',
		href: '/',
		icon: LayoutDashboardIcon,
	},
	{
		label: 'Workouts',
		href: '/workouts',
		icon: FlameIcon,
	},
]

export const NavigationRoutes = () => {
	const pathname = usePathname()

	return (
		<div className='flex flex-col mt-10 gap-y-2'>
			{routes.map(({ label, href, icon: Icon }) => (
				<Link
					key={href}
					prefetch={false}
					href={href}
					className={cn(
						'flex gap-x-2 px-4 py-3 items-center duration-200 text-muted-foreground hover:text-primary rounded-md',
						(pathname === href ||
							(href !== '/' && pathname.includes(href))) &&
							'text-primary bg-accent'
					)}
				>
					<Icon className='w-5 h-5' />
					<span className='text-sm'>{label}</span>
				</Link>
			))}
		</div>
	)
}
