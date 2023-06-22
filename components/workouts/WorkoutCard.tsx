import { Workout } from '@prisma/client'
import React from 'react'
import { Icons } from '../icons'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader } from '../ui/card'

interface WorkoutCardProps {
	workout: Workout
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
	return (
		<Card>
			<CardHeader className='flex flex-row items-center justify-between p-4 pb-2'>
				<p className='text-lg font-semibold'>{workout.title}</p>

				<Button variant='ghost' size='sm'>
					<Icons.pencil size={20} />
				</Button>
			</CardHeader>
			<CardContent className='flex gap-4 p-4 pt-0'>
				<div className='flex items-center gap-2'>
					<Icons.clock size={18} />
					<p className='text-sm text-muted-foreground'>
						{workout.workoutTime}
					</p>
				</div>

				{workout.workoutDuration && (
					<div className='flex items-center gap-2'>
						<Icons.timer size={18} />
						<p className='text-sm text-muted-foreground'>
							{workout.workoutDuration}
						</p>
					</div>
				)}
			</CardContent>
		</Card>
	)
}

export default WorkoutCard
