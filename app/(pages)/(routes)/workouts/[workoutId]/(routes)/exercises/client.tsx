'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Exercise, SetModel, Workout, WorkoutExercise } from '@prisma/client'
import { MoreVerticalIcon } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import TitleHeader from '@/components/custom/TitleHeader'
import { CardLoading } from '@/components/custom/card-loading'
import { Icons } from '@/components/icons'
import SelectExerciseModal from '@/components/modals/select-exercise-modal'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Form } from '@/components/ui/form'
import { useWorkoutExerciseStore } from '@/hooks/use-workout-exercises-store'
import useSelectExerciseModal from '@/hooks/useSelectExerciseModal'
import exerciseService from '@/services/exerciseService'
import { useParams, useRouter } from 'next/navigation'
import { ExerciseSetsModal } from '../../../../../../../components/modals/exercise-sets-modal'
import { UseExerciseSetsModal } from '../../../../../../../hooks/use-exercise-sets-modal'
import workoutService from '../../../../../../../services/workoutService'

const formSchema = z.object({
	exercises: z
		.object({
			id: z.string(),
			exerciseId: z.string(),
			name: z.string(),
			gifUrl: z.string(),
			sets: z
				.object({
					reps: z.number().nullable(),
					weight: z.number().nullable(),
				})
				.array(),
		})
		.array(),
})

export type FormValues = z.infer<typeof formSchema>

interface WorkoutExercisesProps {
	workout: Workout & {
		exercises: (WorkoutExercise & {
			exercise: Exercise
		})[]
	}
	workoutId: string
	bodyPartList: string[]
	targetList: string[]
	equipmentList: string[]
}

export const WorkoutExercisesClient = ({
	workout,
	workoutId,
	bodyPartList,
	targetList,
	equipmentList,
}: WorkoutExercisesProps) => {
	const selectExerciseModal = useSelectExerciseModal()
	const exerciseSetsModal = UseExerciseSetsModal()
	const { exerciseId, setExerciseId } = useWorkoutExerciseStore()

	const router = useRouter()
	const params = useParams()

	const [loading, setLoading] = useState<boolean>(false)
	const [selectedId, setSelectedId] = useState<string | null>(null)

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			exercises: [],
		},
	})

	const exercises = form.watch('exercises')

	const onSubmit = async (data: FormValues) => {
		console.log(data)
	}

	const openSetsModal = (sets: SetModel[], id: string) => {
		setSelectedId(id)
		exerciseSetsModal.setSets(sets)
		exerciseSetsModal.onOpen()
	}

	const onModalClosed = (id: null) => {
		setSelectedId(id)
		router.refresh()
	}

	useEffect(() => {
		router.refresh()
	}, [exerciseSetsModal.onClose])

	const fetchExercise = async (exerciseId: string) => {
		try {
			setLoading(true)

			const { name, gifUrl } = await exerciseService.getExercise(
				exerciseId
			)

			const id = await workoutService.saveWorkoutExercise(
				workoutId,
				exerciseId
			)

			form.setValue('exercises', [
				...form.getValues('exercises'),
				{ id, exerciseId, name, gifUrl, sets: [] },
			])

			setExerciseId(null)

			router.refresh()
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		setLoading(true)

		form.setValue(
			'exercises',
			workout.exercises.map(({ exercise }, index) => ({
				id: workout.exercises[index].id,
				exerciseId: exercise.id,
				name: exercise.name,
				gifUrl: exercise.gifUrl,
				sets: workout.exercises[index].sets,
			}))
		)

		setTimeout(() => setLoading(false), 300)
	}, [workout])

	useEffect(() => {
		if (!exerciseId) return

		fetchExercise(exerciseId)
	}, [exerciseId])

	return (
		<>
			<SelectExerciseModal
				bodyPartList={bodyPartList}
				equipmentList={equipmentList}
				targetList={targetList}
			/>
			<ExerciseSetsModal id={selectedId} onModalClosed={onModalClosed} />
			<div className='flex flex-col gap-y-4'>
				<TitleHeader
					title={workout.name}
					subtitle='Edit workout exercises'
				/>

				<Form {...form}>
					<form
						className='flex flex-col gap-y-4'
						onSubmit={form.handleSubmit(onSubmit)}
					>
						{exercises.map((exercise, index) => (
							<div
								key={exercise.id}
								className='flex p-4 border rounded-md gap-x-4'
							>
								<div className='h-[100px] w-[100px] relative'>
									<Image
										fill
										src={exercise.gifUrl}
										alt={exercise.name}
									/>
								</div>

								<div className='flex-1'>
									<div className='flex items-center justify-between mb-4'>
										<p
											className='font-semibold'
											title={exercise.name}
										>
											{exercise.name}
										</p>

										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant='ghost'
													size='sm'
												>
													<MoreVerticalIcon className='w-4 h-4' />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent className='w-56'>
												<DropdownMenuLabel>
													Exercise
												</DropdownMenuLabel>
												<DropdownMenuSeparator />
												<DropdownMenuItem
													onClick={() =>
														openSetsModal(
															exercise.sets,
															exercise.id
														)
													}
												>
													<Icons.pencil className='w-4 h-4 mr-2' />
													<span>Edit sets</span>
												</DropdownMenuItem>
												<DropdownMenuSeparator />
												<DropdownMenuItem className='text-red-500 hover:!text-red-500 hover:!bg-red-500/10'>
													<Icons.trash className='w-4 h-4 mr-2' />
													<span>Delete exercise</span>
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</div>

									<div className='flex justify-end w-full'>
										<Button
											type='button'
											variant='outline'
											onClick={() =>
												openSetsModal(
													exercise.sets,
													exercise.id
												)
											}
										>
											Sets ({exercise.sets.length})
										</Button>
									</div>
								</div>
							</div>
						))}
						{loading && <CardLoading cards={1} />}

						<Button
							type='button'
							variant='secondary'
							className='w-full'
							disabled={loading}
							onClick={selectExerciseModal.onOpen}
						>
							Add exercise
						</Button>
					</form>
				</Form>
			</div>
		</>
	)
}
