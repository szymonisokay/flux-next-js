'use client'

import { Exercise } from '@prisma/client'
import { DumbbellIcon, ExpandIcon, FlameIcon, HandIcon } from 'lucide-react'
import Image from 'next/image'

import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'
import { useModal } from '@/hooks/use-modal'

type Props = {
	exercise: Exercise
}

export const ExerciseCard = ({ exercise }: Props) => {
	const { id, name, gifUrl, bodyPart, equipment, target } = exercise

	const { setOpen } = useModal()

	return (
		<div className='flex items-start p-4 border rounded-md gap-x-4'>
			<div className='relative overflow-hidden rounded-md w-28 h-28 shrink-0'>
				<Image priority fill src={gifUrl} alt={name} sizes='96px' />
				<Button
					variant='colored'
					size='icon'
					className='absolute z-10 w-7 h-7 top-1 left-1'
					onClick={() =>
						setOpen('imagePreview', { imageUrl: gifUrl })
					}
				>
					<ExpandIcon className='w-4 h-4' />
				</Button>
			</div>

			<div className='flex flex-col gap-4'>
				<Heading title={name} />

				<div className='flex flex-wrap gap-x-8 gap-y-4'>
					<div className='flex items-center text-secondary'>
						<HandIcon className='w-4 h-4 mr-2' />
						<span className='text-sm leading-none'>{bodyPart}</span>
					</div>

					<div className='flex items-center text-secondary'>
						<DumbbellIcon className='w-4 h-4 mr-2' />
						<span className='text-sm leading-none'>
							{equipment}
						</span>
					</div>

					<div className='flex items-center text-secondary'>
						<FlameIcon className='w-4 h-4 mr-2' />
						<span className='text-sm leading-none'>{target}</span>
					</div>
				</div>

				<Button
					variant='outline'
					size='sm'
					onClick={() => setOpen('addExercise', { exercise })}
				>
					Select
				</Button>
			</div>
		</div>
	)
}
