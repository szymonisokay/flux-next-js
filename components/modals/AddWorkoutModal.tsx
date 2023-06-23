'use client'

import useAddWorkoutModal from '../../hooks/useAddWorkoutModal'
import { ExerciseShortInfo } from '../../interfaces/exercises.interface'
import { PaginatedList } from '../../interfaces/paginatedList.interface'
import Modal from './Modal'

interface AddWorkoutModalProps {
	exercises?: PaginatedList<ExerciseShortInfo[]>
}

const AddWorkoutModal: React.FC<AddWorkoutModalProps> = ({ exercises }) => {
	const { isOpen, onClose, date } = useAddWorkoutModal()
	// const selectExerciseModal = useSelectExerciseModal()
	// const router = useRouter()

	// const [selectedExercises, setSelectedExercises] = useState<
	// 	WorkoutExercise[]
	// >([])

	// const [selectedRowId, setSelectedRowId] = useState<string>('')
	// const [title, setTitle] = useState<string>('')
	// const [time, setTime] = useState<string>('')

	// const selectedExercise = useMemo(() => {
	// 	return selectedExercises.find(
	// 		(exercise) => exercise.rowId === selectedRowId
	// 	)
	// }, [selectedExercises, selectedRowId])

	// const craeteWorkoutButtonDisabled = useMemo(() => {
	// 	return (
	// 		selectedExercises.length === 0 ||
	// 		selectedExercises.some((exercise) => !exercise.exerciseId)
	// 	)
	// }, [selectedExercises])

	// const onAddNewExercise = () => {
	// 	setSelectedExercises((exercises) => [
	// 		...exercises.map((exercise) => ({
	// 			...exercise,
	// 			isEditing: false,
	// 		})),
	// 		{ rowId: uuidv4(), isEditing: true, exerciseId: '', sets: [] },
	// 	])
	// }

	// const onCreateWorkout = async () => {
	// 	try {
	// 		const { message } = await workoutService.createWorkout({
	// 			date: date,
	// 			workoutTime: time,
	// 			title: title,
	// 			exercises: selectedExercises,
	// 		} as Workout)

	// 		showToastSuccess(message)
	// 		router.refresh()
	// 		onClose()
	// 		setSelectedExercises([])
	// 		setTitle('')
	// 		setTime('')
	// 	} catch (error) {
	// 		console.log(error)
	// 	}
	// }

	// const onRemoveExercise = (rowId: string) => {
	// 	setSelectedExercises((exercises) =>
	// 		exercises.filter((exercise) => exercise.rowId !== rowId)
	// 	)
	// }

	// const onEditExercise = (rowId: string) => {
	// 	setSelectedExercises((exercises) =>
	// 		exercises.map((exercise) => ({
	// 			...exercise,
	// 			isEditing: exercise.rowId === rowId ? true : false,
	// 		}))
	// 	)
	// }

	// const onSaveExercise = (rowId: string) => {
	// 	setSelectedExercises((exercises) =>
	// 		exercises.map((exercise) => ({
	// 			...exercise,
	// 			isEditing: exercise.rowId === rowId && false,
	// 		}))
	// 	)
	// }

	// const onSetSelectedRowId = (rowId: string) => {
	// 	setSelectedRowId(rowId)
	// 	selectExerciseModal.onOpen()
	// }

	// const onChangeExercise = (rowId: string, exerciseId: string) => {
	// 	setSelectedExercises((exercises) =>
	// 		exercises.map((exercise) => ({
	// 			...exercise,
	// 			exerciseId:
	// 				exercise.rowId === rowId ? exerciseId : exercise.exerciseId,
	// 		}))
	// 	)
	// }

	// const onChangeReps = (rowId: string, value: number) => {
	// 	// setSelectedExercises((exercises) =>
	// 	// 	exercises.map((exercise) => ({
	// 	// 		...exercise,
	// 	// 		sets: []
	// 	// 	}))
	// 	// )
	// }

	// const onChangeSets = (rowId: string, value: number) => {
	// 	// setSelectedExercises((exercises) =>
	// 	// 	exercises.map((exercise) => ({
	// 	// 		...exercise,
	// 	// 		sets: exercise.rowId === rowId ? value : exercise.sets,
	// 	// 	}))
	// 	// )
	// }

	// const body = (
	// 	<div className='flex flex-col gap-4'>
	// 		{date && (
	// 			<p className='text-lg'>
	// 				Add new workout for{' '}
	// 				<span className='font-bold'>{format(date, 'do MMMM')}</span>
	// 			</p>
	// 		)}

	// 		<div>
	// 			<p className='mb-2 text-sm'>Title</p>
	// 			<Input
	// 				value={title}
	// 				onChange={(e) => setTitle(e.target.value)}
	// 			/>
	// 		</div>

	// 		<div>
	// 			<p className='mb-2 text-sm'>Time</p>
	// 			<Input type='time' onChange={(e) => setTime(e.target.value)} />
	// 		</div>

	// 		<Card className='pb-4'>
	// 			{!selectedExercises.length ? (
	// 				<div className='flex flex-col gap-4 p-4 pb-0'>
	// 					<p className='text-center'>
	// 						No exercises selected yet!
	// 					</p>
	// 					<Button variant='outline' onClick={onAddNewExercise}>
	// 						Add new exercise
	// 					</Button>
	// 				</div>
	// 			) : (
	// 				<div className='flex flex-col'>
	// 					{selectedExercises.map((selected) => (
	// 						<SelectedExerciseRow
	// 							key={selected.rowId}
	// 							exercise={selected}
	// 							exercises={exercises.results}
	// 							onEditExercise={onEditExercise}
	// 							onRemoveExercise={onRemoveExercise}
	// 							onSaveExercise={onSaveExercise}
	// 							onSetSelectedRowId={onSetSelectedRowId}
	// 							onChangeReps={onChangeReps}
	// 							onChangeSets={onChangeSets}
	// 						/>
	// 					))}
	// 					<Button
	// 						variant='outline'
	// 						className='mx-4'
	// 						onClick={onAddNewExercise}
	// 					>
	// 						Add new exercise
	// 					</Button>
	// 				</div>
	// 			)}
	// 		</Card>

	// 		<Button
	// 			disabled={craeteWorkoutButtonDisabled}
	// 			onClick={onCreateWorkout}
	// 		>
	// 			Create workout
	// 		</Button>
	// 	</div>
	// )

	return (
		<Modal title='Add workout' isOpen={isOpen} onClose={onClose}>
			<p>Add workout modal</p>
		</Modal>
	)
}

export default AddWorkoutModal
