'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import Modal from '@/components/modals/modal'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { UseExerciseSetsModal } from '@/hooks/use-exercise-sets-modal'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import workoutService from '../../services/workoutService'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'

const formSchema = z.object({
	sets: z
		.object({
			reps: z.number().nullable(),
			weight: z.number().nullable(),
		})
		.array(),
})

type FormValues = z.infer<typeof formSchema>

interface ExerciseSetsModal {
	id: string | null
	onModalClosed: (id: null) => void
}

export const ExerciseSetsModal = ({ id, onModalClosed }: ExerciseSetsModal) => {
	const {
		isOpen,
		onClose,
		sets: defaultSets,
		setSets,
	} = UseExerciseSetsModal()

	const router = useRouter()

	const [loading, setLoading] = useState<boolean>()

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			sets: defaultSets ?? [],
		},
	})

	const sets = form.watch('sets')

	const addNewSet = () => {
		form.setValue('sets', [
			...(form.getValues('sets') ?? []),
			{ reps: 0, weight: 0 },
		])
	}

	const deleteSet = (index: number) => {
		const sets = form.getValues('sets')

		form.setValue(
			'sets',
			sets.filter((_, i) => i !== index)
		)
	}

	const onSubmit = async (data: FormValues) => {
		try {
			if (!id) return
			setLoading(true)

			await workoutService.updateWorkoutExerciseSets(id, data.sets)

			onModalClose()
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	const onModalClose = () => {
		setSets(null)
		onClose()
		onModalClosed(null)
		router.refresh()
	}

	useEffect(() => {
		setLoading(true)
		form.setValue('sets', defaultSets ?? [])

		setTimeout(() => setLoading(false), 300)
	}, [defaultSets])

	return (
		<Modal isOpen={isOpen} onClose={onModalClose} title='Edit sets details'>
			{loading && (
				<div className='flex items-center justify-center h-full'>
					<ClipLoader />
				</div>
			)}

			{!loading && (
				<Form {...form}>
					<form
						className='flex flex-col gap-y-4 '
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<div className='h-[calc(100vh-210px)] md:h-[300px] p-4 overflow-auto'>
							{sets.map((_, index) => (
								<div
									key={index}
									className='pb-4 border-b last-of-type:border-none last-of-type:pb-0'
								>
									<div className='flex items-center justify-between py-4'>
										<p className='text-sm '>
											Set {index + 1}
										</p>

										<Button
											type='button'
											variant='destructive'
											size='sm'
											onClick={() => deleteSet(index)}
										>
											Delete
										</Button>
									</div>
									<div className='flex items-center justify-between gap-x-4'>
										<FormField
											control={form.control}
											name={`sets.${index}.reps`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Reps</FormLabel>
													<FormControl>
														<Input
															type='number'
															{...field}
															value={
																field.value ?? 0
															}
															onChange={(event) =>
																field.onChange(
																	Number(
																		event
																			.target
																			.value
																	)
																)
															}
														/>
													</FormControl>
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`sets.${index}.weight`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Weight
													</FormLabel>
													<FormControl>
														<Input
															type='number'
															{...field}
															value={
																field.value ?? 0
															}
															onChange={(event) =>
																field.onChange(
																	Number(
																		event
																			.target
																			.value
																	)
																)
															}
														/>
													</FormControl>
												</FormItem>
											)}
										/>
									</div>
								</div>
							))}
						</div>
						<Button
							type='button'
							variant='secondary'
							onClick={addNewSet}
						>
							Add new set
						</Button>
						<Separator />
						<Button
							disabled={loading || !form.getValues('sets').length}
						>
							Save sets
						</Button>
					</form>
				</Form>
			)}
		</Modal>
	)
}
