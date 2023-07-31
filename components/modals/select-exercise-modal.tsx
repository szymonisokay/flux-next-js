'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Exercise } from '@prisma/client'
import { SearchIcon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import Pagination from '@/components/custom/Pagination'
import { CardLoading } from '@/components/custom/card-loading'
import { SelectInput } from '@/components/custom/select-input'
import ExerciseCard from '@/components/exercises/exercise-card'
import Modal from '@/components/modals/modal'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import useSelectExerciseModal from '@/hooks/useSelectExerciseModal'
import { PaginatedList } from '@/interfaces/paginatedList.interface'
import exerciseService from '@/services/exerciseService'
import useConfirmExerciseModal from '../../hooks/use-confirm-exercise-modal'
import { useWorkoutExerciseStore } from '../../hooks/use-workout-exercises-store'
import { PaginationModel } from '../../interfaces/pagination.interface'

const formSchema = z.object({
	name: z.string().optional(),
	bodyPart: z.string().optional(),
	target: z.string().optional(),
	equipment: z.string().optional(),
})

export type FormValues = z.infer<typeof formSchema>

interface SelectExerciseModalProps {
	bodyPartList: string[]
	targetList: string[]
	equipmentList: string[]
}

const SelectExerciseModal = ({
	bodyPartList,
	targetList,
	equipmentList,
}: SelectExerciseModalProps) => {
	const selectExerciseModal = useSelectExerciseModal()
	const confirmExerciseModal = useConfirmExerciseModal()
	const { setExerciseId } = useWorkoutExerciseStore()

	const [loading, setLoading] = useState<boolean>(false)
	const [exercises, setExercises] = useState<PaginatedList<
		Exercise[]
	> | null>(null)
	const [pagination, setPagination] = useState<PaginationModel>({
		page: 1,
		pageSize: 10,
	})

	const { page, pageSize } = pagination

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			bodyPart: '',
			target: '',
			equipment: '',
		},
	})

	const onSubmit = async (data: FormValues) => {
		setPagination((pagination) => ({ ...pagination, page: 1 }))
		fetchExercises(data)
	}

	const onSelectExercise = (exerciseId: string) => {
		setExerciseId(exerciseId)
		selectExerciseModal.onClose()
		// confirmExerciseModal.onOpen()
	}

	const fetchExercises = useCallback(
		async (data: FormValues) => {
			setLoading(true)

			try {
				const exercises = await exerciseService.getExercises(
					page,
					pageSize,
					data
				)

				setExercises(exercises)
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false)
			}
		},
		[page, pageSize]
	)

	useEffect(() => {
		fetchExercises({ ...form.getValues() })
	}, [page])

	return (
		<Modal
			title='Select exercise'
			isOpen={selectExerciseModal.isOpen}
			onClose={selectExerciseModal.onClose}
		>
			<Form {...form}>
				<form
					className='flex flex-col gap-y-2'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor='search'>
									Search for exercise
								</FormLabel>
								<FormControl>
									<div className='relative'>
										<Input
											className='pr-10'
											placeholder='Search exercise'
											{...field}
										/>
										<SearchIcon className='absolute w-4 h-4 text-muted-foreground right-4 top-3' />
									</div>
								</FormControl>
							</FormItem>
						)}
					/>

					<Popover>
						<PopoverTrigger asChild>
							<Button
								type='button'
								variant='link'
								className='mx-auto w-max'
							>
								Show advanced filtering
							</Button>
						</PopoverTrigger>
						<PopoverContent className='w-[calc(100vw-32px)] max-w-[450px]'>
							<div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
								<FormField
									control={form.control}
									name='bodyPart'
									render={({ field }) => (
										<FormItem>
											<FormLabel htmlFor='search'>
												Body part
											</FormLabel>
											<FormControl>
												<SelectInput
													placeholder='Body part'
													onValueChange={
														field.onChange
													}
													value={field.value}
													items={bodyPartList}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='target'
									render={({ field }) => (
										<FormItem>
											<FormLabel htmlFor='search'>
												Muscle
											</FormLabel>
											<FormControl>
												<SelectInput
													placeholder='Muscle'
													onValueChange={
														field.onChange
													}
													value={field.value}
													items={targetList}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='equipment'
									render={({ field }) => (
										<FormItem>
											<FormLabel htmlFor='search'>
												Equipment
											</FormLabel>
											<FormControl>
												<SelectInput
													placeholder='Equipment'
													onValueChange={
														field.onChange
													}
													value={field.value}
													items={equipmentList}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<Button onClick={form.handleSubmit(onSubmit)}>
									Search
								</Button>
							</div>
						</PopoverContent>
					</Popover>
					<Button>Search</Button>
				</form>
			</Form>
			<Separator className='my-6' />
			<div>
				<h3 className='text-sm tracking-tight'>
					Total:{' '}
					<span className='font-semibold'>{exercises?.total}</span>
				</h3>

				<div className='mt-4 overflow-hidden'>
					<div className='flex flex-col w-full gap-y-4 overflow-y-auto h-[calc(100vh-400px)]'>
						{loading && <CardLoading cards={5} />}
						{!!exercises &&
							!loading &&
							exercises.results.map((exercise) => (
								<ExerciseCard
									vertical
									selectable
									key={exercise.id}
									exercise={exercise}
									onSelectedChange={onSelectExercise}
								/>
							))}
					</div>
				</div>
				<div className='mt-6'>
					<Pagination
						total={exercises?.total ?? 0}
						pagination={pagination}
						onPaginationChange={setPagination}
					/>
				</div>
			</div>
		</Modal>
	)
}

export default SelectExerciseModal
