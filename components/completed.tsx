'use client'

import { CheckCircle } from 'lucide-react'

import { Badge, BadgeProps } from '@/components/ui/badge'

interface Props extends BadgeProps {
	icon?: boolean
}

export const Completed = ({
	className,
	size,
	variant,
	icon,
	...props
}: Props) => {
	return (
		<Badge variant={variant} size={size} className={className} {...props}>
			{icon && <CheckCircle className='w-4 h-4 mr-2' />}
			Completed
		</Badge>
	)
}
