'use client'

import { Workout, WorkoutExercise } from '@prisma/client'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import useAddWorkoutModal from '../../hooks/useAddWorkoutModal'
import useSelectExerciseModal from '../../hooks/useSelectExerciseModal'
import { ChangedExercise } from '../../interfaces/exercises.interface'
import workoutService from '../../services/workoutService'
import { showToastSuccess } from '../../utils/showToast'
import SelectedExerciseRow from '../exercises/SelectedExerciseRow'
import { Icons } from '../icons'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Input } from '../ui/input'
import Modal from './Modal'

interface AddWorkoutModalProps {
	onSelectExercise: (exercise: WorkoutExercise) => void
	changedExercise: ChangedExercise
}

const AddWorkoutModal: React.FC<AddWorkoutModalProps> = ({
	onSelectExercise,
	changedExercise,
}) => {
	const router = useRouter()
	const { isOpen, onClose, date } = useAddWorkoutModal()
	const selectExerciseModal = useSelectExerciseModal()

	const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>(
		[]
	)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const { register, handleSubmit, reset } = useForm<FieldValues>({
		defaultValues: {
			title: '',
			workoutTime: '',
		},
	})

	const onCreateWorkout: SubmitHandler<FieldValues> = async (data) => {
		setIsLoading(true)

		try {
			const { message } = await workoutService.createWorkout({
				...data,
				date: date,
				exercises: workoutExercises,
			} as Workout)

			showToastSuccess(message)
			router.refresh()
			onClose()
			reset()
			setWorkoutExercises([])
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	const createWorkoutButtonDisabled = useMemo(() => {
		return (
			workoutExercises.length === 0 ||
			workoutExercises.some((exercise) => !exercise.exerciseId)
		)
	}, [workoutExercises])

	const onAddNewExercise = () => {
		setWorkoutExercises((exercises) => [
			...exercises.map((exercise) => ({
				...exercise,
				isEditing: false,
			})),
			{ rowId: uuidv4(), isEditing: true, exerciseId: '', sets: [] },
		])
	}

	const onRemoveExercise = (rowId: string) => {
		setWorkoutExercises((exercises) =>
			exercises.filter((exercise) => exercise.rowId !== rowId)
		)
	}

	const onEditExercise = (rowId: string) => {
		setWorkoutExercises((exercises) =>
			exercises.map((exercise) => ({
				...exercise,
				isEditing: exercise.rowId === rowId ? true : false,
			}))
		)
	}

	const onSaveExercise = (rowId: string) => {
		setWorkoutExercises((exercises) =>
			exercises.map((exercise) => ({
				...exercise,
				isEditing: exercise.rowId === rowId && false,
			}))
		)
	}

	const onChangeReps = (rowId: string, value: number) => {
		// setSelectedExercises((exercises) =>
		// 	exercises.map((exercise) => ({
		// 		...exercise,
		// 		sets: []
		// 	}))
		// )
	}

	const onChangeSets = (rowId: string, value: number) => {
		// setSelectedExercises((exercises) =>
		// 	exercises.map((exercise) => ({
		// 		...exercise,
		// 		sets: exercise.rowId === rowId ? value : exercise.sets,
		// 	}))
		// )
	}

	const onSetSelectedRowId = (rowId: string) => {
		const exercise = workoutExercises.find(
			(exercise) => exercise.rowId === rowId
		)

		if (!exercise) return

		onSelectExercise(exercise)
		selectExerciseModal.onOpen()
	}

	useEffect(() => {
		setWorkoutExercises((exercises) =>
			exercises.map((exercise) => ({
				...exercise,
				exerciseId:
					exercise.rowId === changedExercise.rowId
						? changedExercise.exerciseId
						: exercise.exerciseId,
			}))
		)
	}, [changedExercise])

	return (
		<Modal title='Add workout' isOpen={isOpen} onClose={onClose}>
			<div className='flex flex-col gap-4'>
				{date && (
					<p className='text-lg'>
						Add new workout for{' '}
						<span className='font-bold'>
							{format(date, 'do MMMM')}
						</span>
					</p>
				)}

				<div>
					<p className='mb-2 text-sm'>Title</p>
					<Input
						id='title'
						{...register('title', { required: true })}
					/>
				</div>

				<div>
					<p className='mb-2 text-sm'>Time</p>
					<Input
						id='workoutTime'
						type='time'
						{...register('workoutTime', { required: true })}
					/>
				</div>

				<Card className='pb-4'>
					{!workoutExercises.length ? (
						<div className='flex flex-col gap-4 p-4 pb-0'>
							<p className='text-center'>
								No exercises selected yet!
							</p>
							<Button
								variant='outline'
								onClick={onAddNewExercise}
							>
								Add new exercise
							</Button>
						</div>
					) : (
						<div className='flex flex-col'>
							{workoutExercises.map((selected) => (
								<SelectedExerciseRow
									key={selected.rowId}
									exercise={selected}
									onEditExercise={onEditExercise}
									onRemoveExercise={onRemoveExercise}
									onSaveExercise={onSaveExercise}
									onSetSelectedRowId={onSetSelectedRowId}
									onChangeReps={onChangeReps}
									onChangeSets={onChangeSets}
								/>
							))}
							<Button
								variant='outline'
								className='mx-4'
								onClick={onAddNewExercise}
							>
								Add new exercise
							</Button>
						</div>
					)}
				</Card>

				<Button
					disabled={createWorkoutButtonDisabled || isLoading}
					onClick={handleSubmit(onCreateWorkout)}
				>
					{isLoading && (
						<Icons.spinner className='w-4 h-4 mr-2 animate-spin' />
					)}{' '}
					Create workout
				</Button>
			</div>
		</Modal>
	)
}

export default AddWorkoutModal
