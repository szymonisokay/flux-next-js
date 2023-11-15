'use client'

import Link from 'next/link'

import { Tooltip } from '@/components/tooltip'
import { Button } from '@/components/ui/button'
import { LucideIcon } from 'lucide-react'

type Props = {
	href: string
	label: string
	icon: LucideIcon
}

export const FloatingActionButton = ({ href, label, icon: Icon }: Props) => {
	return (
		<Link
			className='fixed z-50 rounded-full shadow-xl bottom-8 right-8'
			href={href}
		>
			<Tooltip label={label} align='center' side='left'>
				<Button
					variant='colored'
					className='w-12 h-12 p-0 rounded-full hover:bg-primary-color'
				>
					<Icon className='w-5 h-5 shrink-0' />
				</Button>
			</Tooltip>
		</Link>
	)
}
