'use client'

import { CheckCircle } from 'lucide-react'

import { Badge, BadgeProps } from '@/components/ui/badge'

export const Completed = ({ className, size, variant }: BadgeProps) => {
	return (
		<Badge variant={variant} size={size} className={className}>
			<CheckCircle className='w-4 h-4 mr-2' />
			Completed
		</Badge>
	)
}
