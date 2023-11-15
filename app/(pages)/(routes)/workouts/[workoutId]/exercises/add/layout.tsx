import { Suspense } from 'react'

import { SearchExerciseForm } from '@/components/forms/search-exercise-form'
import { PageHeader } from '@/components/page-header'

import { Filters } from './_components/filters'
import { SkeletonList } from './_components/skeleton-list'

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<div id='top' />
			<PageHeader
				title='Add exercise'
				description='Select one exercise and add it to workout'
			/>

			<SearchExerciseForm />

			<Filters />
			<Suspense fallback={<SkeletonList />}>{children}</Suspense>
		</>
	)
}

export default Layout
