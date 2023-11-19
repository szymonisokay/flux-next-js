'use client'

import { Skeleton } from '@/components/ui/skeleton'

export const WorkoutPageSkeleton = () => {
	return (
		<div className='flex flex-col gap-4'>
			<div className='space-y-2'>
				<Skeleton className='w-20 h-4' />
				<Skeleton className='w-full h-10' />
			</div>

			<div className='space-y-2'>
				<Skeleton className='w-20 h-4' />
				<Skeleton className='w-full h-36' />
			</div>

			<div className='space-y-2'>
				<Skeleton className='w-20 h-4' />
				<Skeleton className='w-full h-10' />
			</div>

			<Skeleton className='w-full h-10' />
		</div>
	)
}
