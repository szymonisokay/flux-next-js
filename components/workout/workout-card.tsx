import { Workout } from '@prisma/client'
import { ClockIcon, WeightIcon } from 'lucide-react'
import Link from 'next/link'

import { Completed } from '@/components/completed'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

import { Skeleton } from '@/components/ui/skeleton'
import { WorkoutCardMenu } from './workout-card-menu'

type Props = {
	workout: Workout
	highlighted: boolean
}

export const WorkoutCard = ({ workout, highlighted }: Props) => {
	const { id, name, description, duration, weight, completed } = workout

	return (
		<div
			className={cn(
				'p-4 mt-2 border rounded-md hover:bg-muted duration-200 group max-w-sm',
				highlighted && 'bg-muted',
				completed &&
					'border-primary-color hover:bg-primary-color/10 opacity-50'
			)}
		>
			<div className='flex items-start justify-between gap-x-4'>
				<div>
					{completed && (
						<Completed
							size='default'
							variant='colored'
							className='mb-1'
						/>
					)}
					<Link href={`/workouts/${id}/edit`}>
						<h3 className='text-lg font-semibold leading-tight text-primary'>
							{name}
						</h3>
					</Link>
					<p className='text-sm truncate whitespace-pre-wrap text-secondary'>
						{description}
					</p>
				</div>

				<WorkoutCardMenu workoutId={id} />
			</div>

			{(weight || duration) && (
				<Separator
					className={cn(
						'my-4 duration-200 group-hover:bg-secondary',
						highlighted && 'bg-secondary'
					)}
				/>
			)}

			<div className='flex items-center'>
				{duration && (
					<div className='flex items-center mr-8 text-secondary'>
						<ClockIcon className='w-4 h-4 mr-2' />

						<span className='text-sm'>{duration}</span>
					</div>
				)}

				{weight && (
					<div className='flex items-center text-secondary'>
						<WeightIcon className='w-4 h-4 mr-2' />

						<span className='text-sm'>{weight} kg</span>
					</div>
				)}
			</div>
		</div>
	)
}

const WorkoutCardSkeleton = () => {
	return (
		<div className='p-4 border-[1px] border-accent/50 rounded-md'>
			<div className='flex justify-between'>
				<div className='flex flex-col gap-2'>
					<Skeleton className='w-24 h-6' />
					<Skeleton className='h-3 w-60' />
					<Skeleton className='w-40 h-3' />
				</div>

				<Skeleton className='w-8 h-8' />
			</div>

			<div className='flex gap-8 mt-8'>
				<Skeleton className='w-16 h-6' />
				<Skeleton className='w-16 h-6' />
			</div>
		</div>
	)
}

WorkoutCard.Skeleton = WorkoutCardSkeleton
