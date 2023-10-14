'use client'

import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Set } from '@prisma/client'
import { CrownIcon } from 'lucide-react'

type Props = {
	sets: Set[]
}

export const ExerciseCardSetsPopover = ({ sets }: Props) => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='ghost' size='sm' className='justify-start'>
					<CrownIcon className='w-4 h-4 mr-2' />
					Sets
					<span className='ml-auto text-secondary'>
						({sets.length})
					</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent align='end'>
				<Heading
					title='Sets'
					description='Your sets in this exercise'
				/>
				<Separator className='my-4' />

				{sets.map((set, index) => (
					<div
						key={set.id}
						className='flex items-start pb-4 last-of-type:pb-0'
					>
						<div className='flex items-center justify-center w-auto h-10 px-4 text-sm font-semibold rounded-md bg-accent'>
							<span>{++index}. Set</span>
						</div>
						<div className='flex items-center ml-auto gap-x-8'>
							<div>
								<p className='text-sm'>Reps</p>
								<p className='text-sm text-secondary'>
									{set.reps}
								</p>
							</div>
							<div>
								<p className='text-sm'>Weight</p>
								<p className='text-sm text-secondary'>
									{set.weight} kg
								</p>
							</div>
						</div>
					</div>
				))}
			</PopoverContent>
		</Popover>
	)
}
