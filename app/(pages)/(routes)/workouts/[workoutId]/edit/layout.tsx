import { Suspense } from 'react'

import { PageHeader } from '@/components/page-header'
import { Skeleton } from '@/components/ui/skeleton'

import { CompletedBadge } from './_components/completed-badge'
import { EditWorkoutPageSkeleton } from './_components/edit-workout-page-skeleton'

type Params = {
	children: React.ReactNode
	params: {
		workoutId: string
	}
}

const EditWorkoutLayout = ({ children, params }: Params) => {
	return (
		<>
			<div className='flex items-center justify-between w-full'>
				<PageHeader
					href='/workouts'
					title='Edit workout'
					description='Edit your workout details'
				/>

				<Suspense
					fallback={<Skeleton className='h-6 rounded-full w-28' />}
				>
					<CompletedBadge workoutId={params.workoutId} />
				</Suspense>
			</div>

			<Suspense fallback={<EditWorkoutPageSkeleton />}>
				{children}
			</Suspense>
		</>
	)
}

export default EditWorkoutLayout
