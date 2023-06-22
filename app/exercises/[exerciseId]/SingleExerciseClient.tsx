'use client'

import { Exercise } from '@prisma/client'
import TitleHeader from '../../../components/custom/TitleHeader'
import Video from '../../../components/custom/Video'
import ExerciseCard from '../../../components/exercises/ExerciseCard'
import ExerciseMetaData from '../../../components/exercises/ExerciseMetaData'
import { Icons } from '../../../components/icons'
import { Button } from '../../../components/ui/button'

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
			<TitleHeader title={exercise.exercise_name}>
				<Button variant='outline' size='sm'>
					<Icons.add size={20} />
				</Button>
			</TitleHeader>

			<Video controls src={exercise.videoURL[0]} />

			<div className='flex flex-col gap-4'>
				<p className='text-base font-semibold'>Basic information</p>
				<div className='px-2'>
					<ExerciseMetaData
						category={exercise.Category}
						difficulty={exercise.Difficulty}
						muscle={exercise.target.Primary[0]}
					/>
				</div>
			</div>

			<div className='flex flex-col gap-4'>
				<p className='text-base font-semibold'>Similar exercises</p>
				<div className='overflow-x-auto'>
					<div className='flex gap-4 pb-4 overfow-x-hidden'>
						{similarExercises &&
							similarExercises.map((exercise) => (
								<ExerciseCard key={exercise.id} {...exercise} />
							))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default SingleExerciseClient
