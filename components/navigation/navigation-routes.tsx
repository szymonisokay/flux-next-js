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
					prefetch={false}
					href={href}
					className={cn(
						'flex gap-x-2 px-4 py-2 items-center duration-200 text-slate-500 hover:text-slate-900  rounded-md',
						pathname === href && 'text-slate-900 bg-slate-300/30'
					)}
				>
					<Icon className='w-5 h-5' />
					<span>{label}</span>
				</Link>
			))}
		</div>
	)
}
