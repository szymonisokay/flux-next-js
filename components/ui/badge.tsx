import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
	'inline-flex items-center border rounded-full text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
	{
		variants: {
			variant: {
				default:
					'bg-primary hover:bg-primary/80 border-transparent text-primary-foreground',
				secondary:
					'bg-secondary hover:bg-secondary/80 border-transparent text-secondary-foreground',
				destructive:
					'bg-destructive hover:bg-destructive/80 border-transparent text-destructive-foreground',
				outline: 'text-foreground',
				colored: 'bg-primary-color border-primary-color',
			},
			size: {
				default: 'px-2.5 py-0.5',
				sm: 'px-2.5 py-1',
				lg: 'px-2.5 py-2',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
)

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
	return (
		<div
			className={cn(badgeVariants({ variant, size }), className)}
			{...props}
		/>
	)
}

export { Badge, badgeVariants }
