import { Workout } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Icons } from '../icons'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader } from '../ui/card'

interface WorkoutCardProps {
	workout: Workout
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
	const router = useRouter()

	return (
		<Card>
			<CardHeader className='flex flex-row items-center justify-between p-4 pb-2'>
				<p className='text-lg font-semibold'>{workout.name}</p>

				<Button
					variant='ghost'
					size='sm'
					onClick={() => router.push(`/workouts/${workout.id}`)}
				>
					<Icons.pencil size={20} />
				</Button>
			</CardHeader>
			<CardContent className='flex gap-4 p-4 pt-0'>
				<div className='flex items-center gap-2'>
					<Icons.clock size={18} />
					<p className='text-sm text-muted-foreground'>
						{workout.time}
					</p>
				</div>

				{workout.duration && (
					<div className='flex items-center gap-2'>
						<Icons.timer size={18} />
						<p className='text-sm text-muted-foreground'>
							{workout.duration}
						</p>
					</div>
				)}
			</CardContent>
		</Card>
	)
}

export default WorkoutCard
