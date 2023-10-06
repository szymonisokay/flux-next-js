'use client'

import {
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
	Tooltip as TooltipWrapper,
} from '@/components/ui/tooltip'

type Props = {
	children: React.ReactNode
	label?: string
	side?: 'left' | 'right' | 'top' | 'bottom'
	align?: 'start' | 'center' | 'end'
}

export const Tooltip = ({
	children,
	label,
	side = 'left',
	align = 'start',
}: Props) => {
	return (
		<TooltipProvider delayDuration={200}>
			<TooltipWrapper>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent side={side} align={align}>
					<p>{label}</p>
				</TooltipContent>
			</TooltipWrapper>
		</TooltipProvider>
	)
}
