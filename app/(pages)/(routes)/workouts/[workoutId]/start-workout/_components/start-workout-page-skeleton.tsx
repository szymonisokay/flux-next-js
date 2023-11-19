'use client'

import { ExerciseCard } from '@/components/exercise/exercise-card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export const StartWorkoutPageSkeleton = () => {
	return (
		<div className='flex flex-col gap-4'>
			<ExerciseCard.Skeleton />

			<Skeleton className='w-32 h-6' />

			<div className='flex flex-col gap-2'>
				{Array.from({ length: 3 }, (_, i) => (
					<div key={i} className='flex items-center'>
						<Skeleton className='w-24 h-8' />

						<div className='flex items-center gap-4 ml-auto'>
							<div className='space-y-1'>
								<Skeleton className='w-10 h-3' />
								<Skeleton className='w-6 h-3' />
							</div>

							<div className='space-y-1'>
								<Skeleton className='w-10 h-3' />
								<Skeleton className='w-6 h-3' />
							</div>
						</div>
					</div>
				))}
			</div>

			<Separator className='bg-accent/50' />

			<Skeleton className='w-32 h-6' />

			<ExerciseCard.Skeleton />
		</div>
	)
}
