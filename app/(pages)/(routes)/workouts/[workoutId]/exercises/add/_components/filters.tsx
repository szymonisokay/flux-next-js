'use client'

import { Fragment } from 'react'

import { Badge } from '@/components/ui/badge'
import { useFilters } from '@/hooks/use-filters'
import { useHorizontalScroll } from '@/hooks/use-horizontal-scroll'

export const Filters = () => {
	const filters = useFilters()
	const { containerRef, onMouseDown, onMouseUp, onMouseMove, onMouseLeave } =
		useHorizontalScroll()

	return (
		<div
			ref={containerRef}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
			onMouseLeave={onMouseLeave}
			onMouseMove={onMouseMove}
			id='drag-container'
			className='flex items-center w-full gap-2 pb-4 overflow-x-hidden select-none whitespace-nowrap'
		>
			{Object.entries(filters).map(([key, value], index) => (
				<Fragment key={index}>
					{value && (
						<Badge variant='outline' className='gap-1 px-4 py-1.5'>
							<span className='capitalize text-secondary'>
								{key}:
							</span>
							<span className='text-primary'>{value}</span>
						</Badge>
					)}
				</Fragment>
			))}
		</div>
	)
}
