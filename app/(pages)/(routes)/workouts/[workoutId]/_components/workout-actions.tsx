'use client'

import { EditIcon, PlayIcon } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { Tooltip } from '@/components/tooltip'
import { Button } from '@/components/ui/button'

export const WorkoutActions = () => {
	const params = useParams()

	return (
		<div className='flex items-center gap-x-2'>
			<Link href={`/workouts/${params.workoutId}/start`}>
				<Tooltip label='Start working out' side='bottom' align='end'>
					<Button variant='ghost' size='icon'>
						<PlayIcon className='w-4 h-4' />
					</Button>
				</Tooltip>
			</Link>

			<Link href={`/workouts/${params.workoutId}/edit`}>
				<Tooltip label='Edit workout' side='bottom' align='end'>
					<Button variant='colored' size='icon'>
						<EditIcon className='w-4 h-4' />
					</Button>
				</Tooltip>
			</Link>
		</div>
	)
}
