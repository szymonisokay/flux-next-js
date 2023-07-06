'use client'

import { Exercise } from '@prisma/client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ClipLoader } from 'react-spinners'

import Pagination from '@/components/custom/Pagination'
import SearchBar from '@/components/custom/Searchbar'
import Exercises from '@/components/exercises/Exercises'
import { PaginatedList } from '@/interfaces/paginatedList.interface'
import { PaginationModel } from '@/interfaces/pagination.interface'
import exerciseService from '@/services/exerciseService'

const ExercisesClient = () => {
	const params = useSearchParams()
	const router = useRouter()
	const pathname = usePathname()

	const [exercises, setExercises] = useState<PaginatedList<Exercise[]>>({
		results: [],
		total: 0,
	})
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [pagination, setPagination] = useState<PaginationModel>({
		page: 1,
		pageSize: 10,
	})
	const [query, setQuery] = useState<string>(params?.get('query') || '')
	const [searchValue, setSearchValue] = useState<string>(
		params?.get('query') || ''
	)

	const { page, pageSize } = pagination

	const isEmptyState = useMemo(() => {
		return exercises.total === 0
	}, [exercises.total])

	const fetchExercises = useCallback(async () => {
		setIsLoading(true)

		try {
			const exercises = await exerciseService.getExercises(
				page,
				pageSize,
				query
			)

			setExercises(exercises)
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}, [page, pageSize, query])

	const updateSearchParams = (searchQuery: string) => {
		if (params) {
			const currentQuery = qs.parse(params.toString())

			const query: any = {
				...currentQuery,
				query: searchQuery,
			}

			if (!searchQuery) {
				delete query.query
			}

			const url = qs.stringifyUrl(
				{
					url: pathname || '/',
					query: query,
				},
				{ skipNull: true }
			)

			router.push(url)
		}
	}

	useEffect(() => {
		updateSearchParams(query)
	}, [query])

	useEffect(() => {
		const timeout = setTimeout(() => setQuery(searchValue), 500)

		return () => clearTimeout(timeout)
	}, [searchValue])

	useEffect(() => {
		fetchExercises()
	}, [page, pageSize, query])

	return (
		<div className='flex flex-col gap-4'>
			<SearchBar value={searchValue} onChange={setSearchValue} />

			{isLoading && (
				<div className='flex items-center justify-center h-full'>
					<ClipLoader />
				</div>
			)}

			{!isLoading && isEmptyState && <p>empty</p>}

			{!isLoading && !isEmptyState && (
				<>
					<div className='pt-2 text-sm text-muted-foreground'>
						<p>
							Total:{' '}
							<span className='font-bold text-primary'>
								{exercises.total}
							</span>
						</p>
					</div>
					<Exercises exercises={exercises.results} />
					<Pagination
						total={exercises.total}
						pagination={pagination}
						onPaginationChange={setPagination}
					/>
				</>
			)}
		</div>
	)
}

export default ExercisesClient
