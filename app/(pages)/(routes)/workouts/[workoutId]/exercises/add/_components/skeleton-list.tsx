import { Skeleton } from '@/components/ui/skeleton'

export const SkeletonList = () => {
	return (
		<>
			<Skeleton className='w-20 h-4 mb-4' />
			<div className='flex flex-col w-full gap-4'>
				{Array.from({ length: 5 }, (_, i) => (
					<div
						key={i}
						className='flex gap-4 p-4 border-[1px] border-accent/50 rounded-md'
					>
						<Skeleton className='rounded-md w-28 h-28' />

						<div>
							<Skeleton className='w-40 h-6 mb-4' />
							<div className='flex flex-wrap gap-4 mb-4'>
								<Skeleton className='w-20 h-4' />
								<Skeleton className='w-10 h-4' />
								<Skeleton className='w-16 h-4' />
							</div>
							<Skeleton className='w-full h-10' />
						</div>
					</div>
				))}
			</div>
		</>
	)
}
