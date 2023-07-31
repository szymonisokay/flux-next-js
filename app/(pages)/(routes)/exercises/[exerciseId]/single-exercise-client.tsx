'use client'

import ExercisePlaceholder from '@/public/images/exercise-placeholder.png'
import { Exercise } from '@prisma/client'
import Image from 'next/image'

import TitleHeader from '@/components/custom/TitleHeader'
import ExerciseCard from '@/components/exercises/exercise-card'
import ExerciseMetaData from '@/components/exercises/exercise-meta-data'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'

interface SingleExerciseClientProps {
	exercise: Exercise | null
	similarExercises: Exercise[] | null
}

const SingleExerciseClient: React.FC<SingleExerciseClientProps> = ({
	exercise,
	similarExercises,
}) => {
	if (!exercise) {
		return <div>no Exercise</div>
	}

	return (
		<div className='flex flex-col gap-4'>
			<TitleHeader title={exercise.name}>
				<Button variant='outline' size='sm'>
					<Icons.add size={20} />
				</Button>
			</TitleHeader>

			<div className='relative h-[300px]'>
				<Image
					priority
					fill
					src={exercise.gifUrl || ExercisePlaceholder}
					alt={exercise.name}
				/>
			</div>

			<div className='flex flex-col gap-4'>
				<p className='text-base font-semibold'>Basic information</p>
				<ExerciseMetaData exercise={exercise} />
			</div>

			<div className='flex flex-col gap-4'>
				<p className='text-base font-semibold'>Similar exercises</p>
				<div className='overflow-x-auto'>
					<div className='flex gap-4 pb-4 overfow-x-hidden'>
						{similarExercises &&
							similarExercises.map((exercise) => (
								<ExerciseCard
									key={exercise.id}
									exercise={exercise}
								/>
							))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default SingleExerciseClient
