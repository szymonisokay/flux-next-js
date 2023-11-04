import { Suspense } from 'react'

import { SearchExerciseForm } from '@/components/forms/search-exercise-form'
import { PageHeader } from '@/components/page-header'

import { Filters } from './_components/filters'

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
			<Suspense fallback={<p>loading page</p>}>{children}</Suspense>
		</>
	)
}

export default Layout
