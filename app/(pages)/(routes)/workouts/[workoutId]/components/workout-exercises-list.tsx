'use client'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import useSelectExerciseModal from '@/hooks/useSelectExerciseModal'
import { cn } from '@/lib/utils'

export const WorkoutExercisesList = () => {
	const { onOpen } = useSelectExerciseModal()

	return (
		<div className='flex flex-col p-4 border rounded-md gap-y-4'>
			<Button
				type='button'
				className={cn(
					'flex w-full justify-start text-left font-normal text-muted-foreground'
				)}
				variant='outline'
				onClick={onOpen}
			>
				<Icons.dumbbell className='w-4 h-4 mr-2' />
				<span>Add exercise</span>

				<Icons.externalLink className='w-4 h-4 ml-auto' />
			</Button>
		</div>
	)
}
