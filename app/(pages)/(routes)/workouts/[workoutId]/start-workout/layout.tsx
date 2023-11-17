import { Suspense } from 'react'

import { PageHeader } from '@/components/page-header'

import { StartWorkoutPageSkeleton } from './_components/start-workout-page-skeleton'

type Params = {
	children: React.ReactNode
}

const StartWorkoutPageLayout = ({ children }: Params) => {
	return (
		<>
			<PageHeader
				title='Workout session'
				description='Complete all of your exercises'
			/>
			<Suspense fallback={<StartWorkoutPageSkeleton />}>
				{children}
			</Suspense>
		</>
	)
}

export default StartWorkoutPageLayout
