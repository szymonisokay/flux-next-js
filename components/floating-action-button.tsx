'use client'

import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

import { Tooltip } from '@/components/tooltip'
import { Button } from '@/components/ui/button'

type Props = {
	href: string
	label: string
	icon: LucideIcon
}

export const FloatingActionButton = ({ href, label, icon: Icon }: Props) => {
	return (
		<Link
			className='fixed z-50 rounded-full shadow-xl bottom-4 right-4'
			href={href}
		>
			<Tooltip label={label} align='center' side='left'>
				<Button
					variant='colored'
					className='p-0 rounded-full w-[50px] h-[50px] hover:bg-primary-color'
				>
					<Icon className='w-5 h-5 shrink-0' />
				</Button>
			</Tooltip>
		</Link>
	)
}
