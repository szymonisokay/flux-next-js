'use client'

import { WorkoutExercise } from '@prisma/client'
import { ChevronsUpDown } from 'lucide-react'
import useExercises from '../../hooks/useExercises'
import { ExerciseShortInfo } from '../../interfaces/exercises.interface'
import { Icons } from '../icons'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface SelectedExerciseRowProps {
	exercise: WorkoutExercise
	exercises: ExerciseShortInfo[]
	onEditExercise: (rowId: string) => void
	onRemoveExercise: (rowId: string) => void
	onSaveExercise: (rowId: string) => void
	onSetSelectedRowId: (rowId: string) => void
	onChangeReps: (rowId: string, value: number) => void
	onChangeSets: (rowId: string, value: number) => void
}

const SelectedExerciseRow: React.FC<SelectedExerciseRowProps> = ({
	exercise,
	exercises,
	onEditExercise,
	onRemoveExercise,
	onSaveExercise,
	onSetSelectedRowId,
	onChangeReps,
	onChangeSets,
}) => {
	const { exerciseName } = useExercises({
		exercises,
		exerciseId: exercise.exerciseId,
	})

	return (
		<div
			className={`
				relative
			 	duration-200 
				gap-4 
				flex 
				overflow-hidden 
				group 
				border-b-[1px] 
				p-4 
				last-of-type:border-none 
				${exercise.isEditing ? 'flex-col' : 'flex-row'}
			`}
			key={exercise.rowId}
		>
			<div>
				<p>Exercise</p>
				{exercise.isEditing ? (
					<Button
						variant='outline'
						className='flex justify-between w-full mt-2'
						onClick={() => onSetSelectedRowId(exercise.rowId)}
					>
						<p>
							{exerciseName ? exerciseName : 'Select exercise...'}
						</p>

						<ChevronsUpDown className='w-4 h-4 ml-2 opacity-50 shrink-0' />
					</Button>
				) : (
					<p className='text-sm truncate text-muted-foreground'>
						{exerciseName ? exerciseName : 'Exercise not selected'}
					</p>
				)}
			</div>
			<div className={`${exercise.isEditing ? 'ml-0' : 'ml-auto'}`}>
				<p>Sets</p>
				{exercise.isEditing ? (
					<Input
						className='mt-2'
						type='number'
						onChange={(e) =>
							onChangeSets(exercise.rowId, +e.target.value)
						}
					/>
				) : (
					<p className='text-sm text-muted-foreground'>{0}</p>
				)}
			</div>
			<div>
				<p>Reps</p>
				{exercise.isEditing ? (
					<Input
						className='mt-2'
						type='number'
						onChange={(e) =>
							onChangeReps(exercise.rowId, +e.target.value)
						}
					/>
				) : (
					<p className='text-sm text-muted-foreground'>{0}</p>
				)}
			</div>
			{!exercise.isEditing && (
				<div className='flex items-center gap-2 duration-200 absolute bg-card right-[-100%] top-[50%] translate-y-[-50%] py-4 pl-4 group-hover:right-4'>
					<Button
						variant='ghost'
						size='sm'
						disabled={exercise.isEditing}
						onClick={() => onEditExercise(exercise.rowId)}
					>
						<Icons.pencil size={18} />
					</Button>

					<Button
						variant='destructive'
						size='sm'
						disabled={exercise.isEditing}
						onClick={() => onRemoveExercise(exercise.rowId)}
					>
						<Icons.trash size={18} />
					</Button>
				</div>
			)}

			{exercise.isEditing && (
				<Button
					size='sm'
					onClick={() => onSaveExercise(exercise.rowId)}
				>
					Save exercise
				</Button>
			)}
		</div>
	)
}

export default SelectedExerciseRow
