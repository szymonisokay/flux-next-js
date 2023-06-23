'use client'

import { WorkoutExercise } from '@prisma/client'
import useSelectExerciseModal from '../../hooks/useSelectExerciseModal'
import { ExerciseShortInfo } from '../../interfaces/exercises.interface'
import { PaginatedList } from '../../interfaces/paginatedList.interface'
import Modal from './Modal'

interface SelectExerciseModalProps {
	exercises?: PaginatedList<ExerciseShortInfo[]>
	selectedExercise?: WorkoutExercise
	onChangeExercise?: (rowId: string, exerciseId: string) => void
}

const SelectExerciseModal: React.FC<SelectExerciseModalProps> = ({
	exercises,
	selectedExercise,
	onChangeExercise,
}) => {
	// const router = useRouter()
	// const pathname = usePathname()
	// const params = useSearchParams()

	// const { query: urlQuery } = useExerciseParams()
	const { isOpen, onClose } = useSelectExerciseModal()

	// const [query, setQuery] = useState<string>(urlQuery)
	// const [selectedId, setSelectedId] = useState<string>('')

	// useEffect(() => {
	// 	setSelectedId(selectedExercise?.exerciseId ?? '')
	// }, [selectedExercise])

	// const { exerciseName } = useExercises({
	// 	exercises: exercises.results,
	// 	exerciseId: selectedId,
	// })

	// const onSetSelectedId = (id: string) => {
	// 	if (selectedId === id) {
	// 		setSelectedId('')
	// 		return
	// 	}

	// 	setSelectedId(id)
	// }

	// const onSetSelectedExercise = () => {
	// 	if (!selectedExercise) return

	// 	onChangeExercise(selectedExercise.rowId, selectedId)
	// 	onClose()
	// 	setSelectedId('')
	// }

	// useEffect(() => {
	// 	const timeout = setTimeout(() => {
	// 		updateParams({ query }, router, params, pathname)
	// 	}, 500)

	// 	return () => clearTimeout(timeout)
	// }, [query, router, params])

	// const body = (
	// 	<>
	// 		<div className='flex flex-col h-full gap-4'>
	// 			<SearchBar value={query} onChange={setQuery} />
	// 			<div className='flex flex-col gap-4 overflow-y-scroll no-scrollbar'>
	// 				{exercises.results.map((exercise) => (
	// 					<ExerciseCard
	// 						key={exercise.id}
	// 						{...exercise}
	// 						selectable
	// 						selectedId={selectedId}
	// 						onSelectedChange={onSetSelectedId}
	// 					/>
	// 				))}
	// 			</div>
	// 		</div>
	// 	</>
	// )

	// const footer = (
	// 	<>
	// 		<Pagination total={exercises.total} />

	// 		<div
	// 			className={`fixed bottom-0 w-full flex flex-col gap-4 p-4 rounded-tl-lg rounded-tr-lg bg-primary duration-150
	// 			${selectedId ? 'translate-y-0' : 'translate-y-full'}
	// 			`}
	// 		>
	// 			<p className='text-primary-foreground'>
	// 				Selected exercise:{' '}
	// 				<span className='font-semibold'>{exerciseName}</span>
	// 			</p>

	// 			<Button variant='secondary' onClick={onSetSelectedExercise}>
	// 				Select exercise
	// 			</Button>
	// 		</div>
	// 	</>
	// )

	return (
		<Modal title='Select exercise' isOpen={isOpen} onClose={onClose}>
			<p>Select exercise modal</p>
		</Modal>
	)
}

export default SelectExerciseModal
