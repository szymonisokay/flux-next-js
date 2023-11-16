import { Skeleton } from '@/components/ui/skeleton'
import { WorkoutCard } from '@/components/workout/workout-card'

export const WorkoutsListSkeleton = () => {
	return (
		<div className='flex h-[calc(100%-80px)] gap-4 pt-4'>
			<Skeleton className='w-2 h-full' />

			<div className='flex flex-col flex-1 gap-4'>
				{Array.from({ length: 3 }, (_, i) => (
					<div key={i}>
						<Skeleton className='w-20 h-4 mb-2' />

						<WorkoutCard.Skeleton />
					</div>
				))}
			</div>
		</div>
	)
}
