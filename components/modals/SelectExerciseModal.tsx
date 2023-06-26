'use client'

import { Exercise, WorkoutExercise } from '@prisma/client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import useExercises from '../../hooks/useExercises'
import useSelectExerciseModal from '../../hooks/useSelectExerciseModal'
import { PaginatedList } from '../../interfaces/paginatedList.interface'
import { PaginationModel } from '../../interfaces/pagination.interface'
import exerciseService from '../../services/exerciseService'
import Pagination from '../custom/Pagination'
import SearchBar from '../custom/Searchbar'
import ExerciseCard from '../exercises/ExerciseCard'
import { Button } from '../ui/button'
import Modal from './Modal'

interface SelectExerciseModalProps {
	exercise: WorkoutExercise | null
	onChangeExercise: (rowId: string, exerciseId: string) => void
}

const SelectExerciseModal: React.FC<SelectExerciseModalProps> = ({
	exercise,
	onChangeExercise,
}) => {
	const { isOpen, onClose } = useSelectExerciseModal()
	const [exercises, setExercises] = useState<PaginatedList<Exercise[]>>({
		results: [],
		total: 0,
	})
	const [pagination, setPagination] = useState<PaginationModel>({
		page: 1,
		pageSize: 10,
	})
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [query, setQuery] = useState<string>('')
	const [searchValue, setSearchValue] = useState<string>('')
	const [selectedExerciseId, setSelectedExerciseId] = useState<string>('')
	const [isBottom, setIsBottom] = useState<boolean>(false)
	const scrollRef = useRef<HTMLDivElement>(null)

	const { page, pageSize } = pagination

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

	useEffect(() => {
		const timeout = setTimeout(() => setQuery(searchValue), 500)

		return () => clearTimeout(timeout)
	}, [searchValue])

	useEffect(() => {
		fetchExercises()
	}, [page, pageSize, query])

	useEffect(() => {
		setSelectedExerciseId(exercise?.exerciseId ?? '')
	}, [exercise])

	const { exerciseName } = useExercises({
		exerciseId: selectedExerciseId,
	})

	const onSetSelectedExerciseId = (exerciseId: string) => {
		if (selectedExerciseId === exerciseId) {
			setSelectedExerciseId('')
			return
		}

		setSelectedExerciseId(exerciseId)
	}

	const onSetSelectedExercise = () => {
		if (!selectedExerciseId || !exercise) return

		onChangeExercise(exercise.rowId, selectedExerciseId)

		onClose()
		setSelectedExerciseId('')
	}

	const onHideSelectedExercise = () => {
		if (!scrollRef.current) return

		const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
		const isBottom = clientHeight + scrollTop >= scrollHeight

		setIsBottom(isBottom)
	}

	const footer = (
		<>
			{!isLoading && (
				<Pagination
					total={exercises.total}
					pagination={pagination}
					onPaginationChange={setPagination}
				/>
			)}

			{selectedExerciseId && (
				<div
					className={`fixed bottom-0 w-full flex-col gap-4 p-4 rounded-tl-lg rounded-tr-lg bg-primary duration-150
					${isBottom ? 'hidden' : 'flex'}
				`}
				>
					<p className='text-primary-foreground'>
						Selected exercise:{' '}
						<span className='font-semibold'>{exerciseName}</span>
					</p>

					<Button variant='secondary' onClick={onSetSelectedExercise}>
						Select exercise
					</Button>
				</div>
			)}
		</>
	)

	return (
		<Modal
			title='Select exercise'
			isOpen={isOpen}
			onClose={onClose}
			footer={footer}
		>
			<div className='flex flex-col h-full gap-4'>
				<SearchBar value={searchValue} onChange={setSearchValue} />
				<div
					ref={scrollRef}
					onScroll={onHideSelectedExercise}
					className='flex flex-col h-full gap-4 overflow-y-scroll no-scrollbar'
				>
					{isLoading && (
						<div className='flex items-center justify-center h-full'>
							<ClipLoader />
						</div>
					)}

					{!isLoading &&
						exercises.results.map((exercise) => (
							<ExerciseCard
								key={exercise.id}
								{...exercise}
								selectable
								selectedId={selectedExerciseId}
								onSelectedChange={onSetSelectedExerciseId}
							/>
						))}
				</div>
			</div>
		</Modal>
	)
}

export default SelectExerciseModal
