'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CopyIcon, Loader2Icon, TrashIcon } from 'lucide-react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useFieldArray, useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { useModal } from '@/hooks/use-modal'
import { Exercise } from '@prisma/client'
import axios from 'axios'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { ScrollArea } from '../ui/scroll-area'

const formSchema = z.object({
	duration: z.string().nullable(),
	sets: z
		.object({
			reps: z.number().nullable(),
			weight: z.number().nullable(),
		})
		.array(),
})

type FormValues = z.infer<typeof formSchema>

type Props = {
	exercise: Exercise
}

export const ManageExerciseDetailsForm = ({ exercise }: Props) => {
	const router = useRouter()
	const pathname = usePathname()
	const params = useParams()
	const { setClose } = useModal()

	const form = useForm<FormValues>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			duration: '',
			sets: [],
		},
	})

	const { fields, append, remove, insert } = useFieldArray({
		name: 'sets',
		control: form.control,
	})

	const loading = form.formState.isSubmitting

	const onSubmit = async (values: FormValues) => {
		try {
			await axios.post(`/api/workouts/${params.workoutId}/trainings`, {
				...values,
				exerciseId: exercise.id,
			})

			router.refresh()
			router.replace(`/workouts/${params.workoutId}/exercises`)

			setTimeout(() => setClose(), 300)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Form {...form}>
			<form
				className='flex flex-col px-1 pt-4 mt-4 border-t'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<ScrollArea className='-mx-4 h-[340px] mb-4 pb-2'>
					<div className='grid grid-cols-1 gap-3 px-4'>
						<FormField
							control={form.control}
							name='duration'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Duration
										<span className='inline-block ml-1 text-xs text-secondary'>
											(optional)
										</span>
									</FormLabel>

									<FormControl>
										<Input
											{...field}
											placeholder='e.g. 90 min'
											value={field.value ?? ''}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<Label>
							Sets
							<span className='inline-block ml-1 text-xs text-secondary'>
								(optional)
							</span>
						</Label>
						{fields.map((field, index) => (
							<div
								key={field.id}
								className='flex items-end gap-x-3'
							>
								<FormField
									control={form.control}
									name={`sets.${index}.reps`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Reps</FormLabel>
											<FormControl>
												<Input
													{...field}
													type='number'
													min={0}
													value={field.value ?? 0}
													onChange={(e) =>
														field.onChange(
															+e.target.value
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
											<FormLabel>Weight</FormLabel>
											<FormControl>
												<Input
													{...field}
													type='number'
													min={0}
													value={field.value ?? 0}
													onChange={(e) =>
														field.onChange(
															+e.target.value
														)
													}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<div className='flex gap-x-2'>
									<Button
										type='button'
										variant='outline'
										className='px-3 shrink-0'
										onClick={() => {
											const { reps, weight } =
												form.getValues(`sets.${index}`)

											insert(++index, { reps, weight })
										}}
									>
										<CopyIcon className='w-4 h-4' />
									</Button>

									<Button
										type='button'
										variant='destructive'
										className='px-3 shrink-0'
										onClick={() => remove(index)}
									>
										<TrashIcon className='w-4 h-4' />
									</Button>
								</div>
							</div>
						))}
						<Button
							type='button'
							variant='outline'
							onClick={() => append({ reps: 0, weight: 0 })}
						>
							Add set
						</Button>
					</div>
				</ScrollArea>

				<Button variant='colored' disabled={loading}>
					{loading && (
						<Loader2Icon className='w-4 h-4 mr-2 animate-spin' />
					)}
					Save
				</Button>
			</form>
		</Form>
	)
}
