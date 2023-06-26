'use client'

import { WorkoutExercise } from '@prisma/client'
import { ExternalLink } from 'lucide-react'
import useExercises from '../../hooks/useExercises'
import { Icons } from '../icons'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface SelectedExerciseRowProps {
	exercise: WorkoutExercise
	onEditExercise: (rowId: string) => void
	onRemoveExercise: (rowId: string) => void
	onSaveExercise: (rowId: string) => void
	onSetSelectedRowId: (rowId: string) => void
	onAddSets: (rowId: string) => void
	onRemoveSets: (rowId: string) => void
	onChangeReps: (
		rowId: string,
		numberOfReps: number,
		setRowId: string
	) => void
	onChangeWeight: (rowId: string, weight: number, setRowId: string) => void
}

const SelectedExerciseRow: React.FC<SelectedExerciseRowProps> = ({
	exercise,
	onEditExercise,
	onRemoveExercise,
	onSaveExercise,
	onSetSelectedRowId,
	onAddSets,
	onRemoveSets,
	onChangeReps,
	onChangeWeight,
}) => {
	const { exerciseName } = useExercises({
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
			<div
				className={`flex ${
					exercise.isEditing
						? 'items-center justify-between gap-4'
						: 'flex-col'
				}`}
			>
				<p>Exercise</p>
				{exercise.isEditing ? (
					<Button
						variant='outline'
						className='flex justify-between w-full max-w-[70%]'
						title={exerciseName}
						onClick={() => onSetSelectedRowId(exercise.rowId)}
					>
						<p className='truncate'>
							{exerciseName ? exerciseName : 'Select exercise...'}
						</p>

						<ExternalLink className='w-4 h-4 ml-2 opacity-50 shrink-0' />
					</Button>
				) : (
					<p className='text-sm truncate text-muted-foreground'>
						{exerciseName ? exerciseName : 'Exercise not selected'}
					</p>
				)}
			</div>
			{exercise.exerciseId && (
				<div
					className={`flex ${
						exercise.isEditing
							? 'ml-0 justify-between items-center gap-4 min-h-[40px]'
							: 'ml-auto flex-col'
					}`}
				>
					<p>Sets</p>
					{exercise.isEditing ? (
						<div className='flex items-center justify-between gap-4'>
							<Button
								variant='ghost'
								size='sm'
								onClick={() => onRemoveSets(exercise.rowId)}
							>
								<Icons.minus size={20} />
							</Button>

							<p>{exercise.sets.length}</p>

							<Button
								variant='ghost'
								size='sm'
								onClick={() => onAddSets(exercise.rowId)}
							>
								<Icons.add size={20} />
							</Button>
						</div>
					) : (
						<p className='text-sm text-muted-foreground'>
							{exercise.sets.length}
						</p>
					)}
				</div>
			)}
			{!!exercise.sets.length && (
				<div className='pr-2 pb-2 overflow-y-auto max-h-[200px] no-scrollbar'>
					{exercise.isEditing && (
						<>
							{exercise.sets.map((set, index) => (
								<div
									key={set.setRowId}
									className='flex gap-4 mb-4 last-of-type:mb-0'
								>
									Set no. {index + 1}
									<div className='ml-auto max-w-[70px]'>
										Reps
										<Input
											className='mt-2'
											value={set.reps ?? 0}
											onChange={(e) =>
												onChangeReps(
													exercise.rowId,
													+e.target.value,
													set.setRowId
												)
											}
										/>
									</div>
									<div className='max-w-[80px]'>
										Weight
										<Input
											className='mt-2'
											value={set.weight ?? 0}
											onChange={(e) =>
												onChangeWeight(
													exercise.rowId,
													+e.target.value,
													set.setRowId
												)
											}
										/>
									</div>
								</div>
							))}
						</>
					)}
				</div>
			)}
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
					disabled={!exercise.sets.length || !exercise.exerciseId}
					onClick={() => onSaveExercise(exercise.rowId)}
				>
					Save exercise
				</Button>
			)}
		</div>
	)
}

export default SelectedExerciseRow
