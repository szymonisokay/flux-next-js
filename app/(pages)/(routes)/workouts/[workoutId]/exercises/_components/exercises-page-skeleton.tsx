'use client'

import { ExerciseCard } from '@/components/exercise/exercise-card'

export const ExercisesPageSkeleton = () => {
	return (
		<div className='flex flex-col gap-4 mt-4'>
			{Array.from({ length: 3 }, (_, i) => (
				<ExerciseCard.Skeleton showSets key={i} />
			))}
		</div>
	)
}
