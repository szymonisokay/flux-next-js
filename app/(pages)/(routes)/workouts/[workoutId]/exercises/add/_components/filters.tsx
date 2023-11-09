'use client'

import { usePathname, useRouter } from 'next/navigation'
import qs from 'query-string'
import { Fragment, MouseEvent } from 'react'

import { Badge } from '@/components/ui/badge'
import { useFilters } from '@/hooks/use-filters'
import { useHorizontalScroll } from '@/hooks/use-horizontal-scroll'
import { cn } from '@/lib/utils'
import { XIcon } from 'lucide-react'

export const Filters = () => {
	const pathname = usePathname()
	const router = useRouter()
	const filters = useFilters()
	const { containerRef, onMouseDown, onMouseUp, onMouseMove, onMouseLeave } =
		useHorizontalScroll()

	const onRemoveFilter = (
		event: MouseEvent<HTMLSpanElement>,
		key: string
	) => {
		event.preventDefault()

		const url = qs.stringifyUrl(
			{
				url: pathname,
				query: {
					...filters,
					[key]: '',
				},
			},
			{ skipEmptyString: true, skipNull: true }
		)

		router.push(url)
	}

	return (
		<div
			ref={containerRef}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
			onMouseLeave={onMouseLeave}
			onMouseMove={onMouseMove}
			id='drag-container'
			className={cn(
				'flex items-center w-full gap-2 overflow-x-hidden select-none whitespace-nowrap',
				!!Object.values(filters).filter((filter) => !!filter).length &&
					'pb-4'
			)}
		>
			{Object.entries(filters).map(([key, value], index) => (
				<Fragment key={index}>
					{value && (
						<Badge
							variant='outline'
							className='gap-1 pl-3 pr-4 py-1.5'
						>
							<span
								role='button'
								className='cursor-pointer'
								onClick={(e) => onRemoveFilter(e, key)}
							>
								<XIcon className='w-4 h-4 mr-1' />
							</span>
							<span className='text-primary'>{value}</span>
						</Badge>
					)}
				</Fragment>
			))}
		</div>
	)
}
