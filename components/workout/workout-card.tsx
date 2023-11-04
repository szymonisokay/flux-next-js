'use client'

import { Workout } from '@prisma/client'
import { ClockIcon, WeightIcon } from 'lucide-react'

import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { WorkoutCardMenu } from './workout-card-menu'

type Props = {
	workout: Workout
	highlighted: boolean
}

export const WorkoutCard = ({ workout, highlighted }: Props) => {
	const { id, name, description, duration, weight } = workout

	return (
		<div
			className={cn(
				'p-4 mt-2 border rounded-md hover:bg-muted duration-200 group max-w-sm',
				highlighted && 'bg-muted'
			)}
		>
			<div className='flex items-start justify-between gap-x-4'>
				<div>
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
