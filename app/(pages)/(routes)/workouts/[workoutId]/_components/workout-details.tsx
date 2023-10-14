'use client'

import { Button } from '@/components/ui/button'
import { Training, Workout } from '@prisma/client'
import { format } from 'date-fns'
import { DumbbellIcon, ExternalLinkIcon } from 'lucide-react'
import Link from 'next/link'

type Props = {
	workout: Workout & {
		trainings: Training[]
	}
}

export const WorkoutDetails = ({ workout }: Props) => {
	const { id, name, description, date, duration, weight, trainings } = workout

	return (
		<div className='grid grid-cols-1 gap-4 mt-4'>
			<div>
				<p className='text-sm tracking-tight text-secondary'>Name</p>
				<p className='leading-tight text-primary'>{name}</p>
			</div>
			{description && (
				<div>
					<p className='text-sm tracking-tight text-secondary'>
						Description
					</p>
					<p className='leading-tight text-primary'>{description}</p>
				</div>
			)}
			<div>
				<p className='text-sm tracking-tight text-secondary'>Date</p>
				<p className='leading-tight text-primary'>
					{format(new Date(date), 'PPP')}
				</p>
			</div>
			{duration && (
				<div>
					<p className='text-sm tracking-tight text-secondary'>
						Duration
					</p>
					<p className='leading-tight text-primary'>{duration}</p>
				</div>
			)}
			{weight && (
				<div>
					<p className='text-sm tracking-tight text-secondary'>
						Weight
					</p>
					<p className='leading-tight text-primary'>{weight} kg</p>
				</div>
			)}
			<Link href={`/workouts/${id}/exercises`} className='block w-full'>
				<Button variant='outline' className='justify-start w-full'>
					<DumbbellIcon className='w-4 h-4 mr-2' />
					Manage exercises ({trainings.length})
					<ExternalLinkIcon className='w-4 h-4 ml-auto text-secondary' />
				</Button>
			</Link>
		</div>
	)
}
