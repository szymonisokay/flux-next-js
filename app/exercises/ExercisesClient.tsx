'use client'

import { Exercise } from '@prisma/client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Pagination from '../../components/custom/Pagination'
import SearchBar from '../../components/custom/Searchbar'
import Exercises from '../../components/exercises/Exercises'
import { PaginatedList } from '../../interfaces/paginatedList.interface'

import { useEffect, useState } from 'react'

import useExerciseParams from '../../hooks/useExerciseParams'
import { updateParams } from '../../lib/updateParams'

interface ExerciseClientProps {
	exercises: PaginatedList<Exercise[]>
}

const ExercisesClient: React.FC<ExerciseClientProps> = ({ exercises }) => {
	const router = useRouter()
	const pathname = usePathname()
	const params = useSearchParams()
	const { query: urlQuery } = useExerciseParams()

	const [query, setQuery] = useState<string>(urlQuery)

	useEffect(() => {
		const timeout = setTimeout(() => {
			updateParams({ query }, router, params, pathname)
		}, 500)

		return () => clearTimeout(timeout)
	}, [query, router, params])

	return (
		<div className='flex flex-col h-full gap-4 px-4 pt-20 pb-4 overflow-y-auto no-scrollbar'>
			<SearchBar value={query} onChange={(value) => setQuery(value)} />

			<div className='-mb-2 text-sm text-muted-foreground'>
				<p>
					Total:{' '}
					<span className='font-bold text-primary'>
						{exercises.total}
					</span>
				</p>
			</div>
			<Exercises exercises={exercises.results} />
			<Pagination total={exercises.total} />
		</div>
	)
}

export default ExercisesClient
