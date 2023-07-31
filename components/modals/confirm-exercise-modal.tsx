'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Exercise } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ClipLoader } from 'react-spinners'
import { v4 as uuidv4 } from 'uuid'
import * as z from 'zod'

import ExerciseCard from '@/components/exercises/exercise-card'
import { Icons } from '@/components/icons'
import Modal from '@/components/modals/modal'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import useConfirmExerciseModal from '@/hooks/use-confirm-exercise-modal'
import { useWorkoutExerciseStore } from '@/hooks/use-workout-exercises-store'
import exerciseService from '@/services/exerciseService'
import { Input } from '../ui/input'

const formSchema = z.object({
	rowId: z.string().uuid(),
	exerciseId: z.string(),
	sets: z
		.object({
			reps: z.number().optional(),
			weight: z.number().optional(),
		})
		.array(),
})

type FormValues = z.infer<typeof formSchema>

const ConfirmExerciseModal = () => {
	const { isOpen, onClose } = useConfirmExerciseModal()
	const { exerciseId, setExerciseId } = useWorkoutExerciseStore()

	const [loading, setLoading] = useState<boolean>(false)
	const [exercise, setExercise] = useState<Exercise | null>(null)

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			rowId: '',
			exerciseId: '',
			sets: [],
		},
	})

	const onModalClose = () => {
		onClose()
		setExerciseId(null)
		form.reset()
	}

	const onSubmit = (data: FormValues) => {
		console.log(data)
	}

	const fetchExercise = async () => {
		try {
			if (!exerciseId) return
			setLoading(true)

			const exercise = await exerciseService.getExercise(exerciseId)

			setExercise(exercise)
			form.setValue('exerciseId', exerciseId)
			form.setValue('rowId', uuidv4())
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (!exerciseId) return

		fetchExercise()
	}, [exerciseId])

	if (!exercise) {
		return null
	}

	return (
		<Modal
			title='Edit exercise information'
			isOpen={isOpen}
			onClose={onModalClose}
		>
			{loading ? (
				<div className='flex items-center justify-center h-full'>
					<ClipLoader />
				</div>
			) : (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='h-full'
					>
						<div className='flex flex-col h-full gap-y-4'>
							<div className='flex-1'>
								<p className='my-2 tracking-tight'>Exercise</p>
								<ExerciseCard vertical exercise={exercise} />
								<p className='my-2 tracking-tight'>
									Exercise information
								</p>
								<div className='flex flex-col p-4 border rounded-md gap-y-4'>
									<div className='flex items-center justify-between gap-x-4'>
										<p>Sets</p>
										<FormField
											control={form.control}
											name='sets'
											render={({ field }) => (
												<div className='flex items-center justify-between ml-auto gap-x-4'>
													<Button
														type='button'
														variant='ghost'
														size='sm'
														onClick={() => {
															field.value.pop()
															return field.onChange(
																field.value
															)
														}}
													>
														<Icons.minus
															size={20}
														/>
													</Button>

													<p>{field.value.length}</p>

													<Button
														type='button'
														variant='ghost'
														size='sm'
														onClick={() =>
															field.onChange([
																...field.value,
																{
																	reps: 0,
																	weight: 0,
																},
															])
														}
													>
														<Icons.add size={20} />
													</Button>
												</div>
											)}
										/>
									</div>

									<FormField
										control={form.control}
										name='sets.0.reps'
										render={({ field }) => (
											<div>
												<div className='flex items-center justify-between'>
													Set No. 1
													<FormItem>
														<FormLabel>
															Reps
														</FormLabel>
														<FormControl>
															<Input
																placeholder='Number of reps'
																type='number'
																{...field}
																onChange={(e) =>
																	field.onChange(
																		Number(
																			e
																				.target
																				.value
																		)
																	)
																}
															/>
														</FormControl>
													</FormItem>
												</div>
											</div>
										)}
									/>
								</div>
							</div>
							<div className='flex w-full gap-x-4'>
								<Button
									type='button'
									variant='outline'
									className='w-full'
									onClick={onModalClose}
								>
									Cancel
								</Button>
								<Button className='w-full'>Confirm</Button>
							</div>
						</div>
					</form>
				</Form>
			)}
		</Modal>
	)
}

export default ConfirmExerciseModal
