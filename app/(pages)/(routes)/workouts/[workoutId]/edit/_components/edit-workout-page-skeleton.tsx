import { Skeleton } from '@/components/ui/skeleton'

export const EditWorkoutPageSkeleton = () => {
	return (
		<div className='flex flex-col gap-4'>
			<div className='flex flex-col gap-2'>
				<Skeleton className='w-20 h-4' />
				<Skeleton className='w-full h-10' />
			</div>

			<div className='flex flex-col gap-2'>
				<Skeleton className='w-20 h-4' />
				<Skeleton className='w-full h-36' />
			</div>

			<div className='flex flex-col gap-2'>
				<Skeleton className='w-20 h-4' />
				<Skeleton className='w-full h-10' />
			</div>

			<div className='flex flex-col gap-2'>
				<Skeleton className='w-20 h-4' />
				<Skeleton className='w-full h-10' />
				<Skeleton className='w-2/3 h-4' />
			</div>

			<div className='flex flex-col gap-2'>
				<Skeleton className='w-20 h-4' />
				<Skeleton className='w-full h-10' />
			</div>

			<div className='flex flex-col gap-2'>
				<Skeleton className='w-20 h-4' />
				<Skeleton className='w-full h-10' />
			</div>

			<Skeleton className='w-full h-10' />
		</div>
	)
}
