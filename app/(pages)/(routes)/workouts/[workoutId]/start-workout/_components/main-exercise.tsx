'use client'

import Image from 'next/image'

import { Heading } from '@/components/heading'
import { Exercise, Set, Training } from '@prisma/client'

import { ExerciseDetails } from './exercise-details'

type Props = {
	training: Training & {
		exercise: Exercise
		sets: Set[]
	}
}

export const MainExercise = ({ training }: Props) => {
	const { exercise } = training

	return (
		<div>
			<div className='flex gap-4 p-4 border rounded-md bg-muted'>
				<div className='relative overflow-hidden rounded-md w-28 h-28 shrink-0'>
					<Image fill src={exercise.gifUrl} alt={exercise.name} />
				</div>

				<Heading title={exercise.name} />
			</div>

			<ExerciseDetails training={training} />
		</div>
	)
}
