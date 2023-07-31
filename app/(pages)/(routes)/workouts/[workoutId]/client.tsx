'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Workout, WorkoutExercise, WorkoutImages } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import TitleHeader from '@/components/custom/TitleHeader'
import { DatePicker } from '@/components/custom/date-picker'
import { TimePicker } from '@/components/custom/time-picker'
import { Icons } from '@/components/icons'
import ConfirmExerciseModal from '@/components/modals/confirm-exercise-modal'
import SelectExerciseModal from '@/components/modals/select-exercise-modal'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { cn } from '../../../../../lib/utils'
import workoutService from '../../../../../services/workoutService'
import { showToastSuccess } from '../../../../../utils/showToast'

const exerciseSchema = z.object({
	exerciseId: z.string(),
	sets: z
		.object({
			reps: z.number().optional(),
			weight: z.number().optional(),
		})
		.array(),
})

const formSchema = z.object({
	name: z.string().min(3),
	date: z.date(),
	time: z.string().nullish(),
})

export type WorkoutFormValues = z.infer<typeof formSchema>
type ExerciseValues = z.infer<typeof exerciseSchema>

interface WorkoutClientProps {
	workout:
		| (Workout & {
				exercises: WorkoutExercise[]
				images: WorkoutImages | null
		  })
		| null
	bodyPartList: string[]
	targetList: string[]
	equipmentList: string[]
}

export const WorkoutClient = ({
	workout,
	bodyPartList,
	targetList,
	equipmentList,
}: WorkoutClientProps) => {
	const router = useRouter()

	const [loading, setLoading] = useState<boolean>(false)

	const form = useForm<WorkoutFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: workout || {
			name: '',
			date: undefined,
			time: '',
		},
	})

	const title = workout ? 'Edit workout' : 'Create workout'
	const buttonText = workout ? 'Edit' : 'Create'

	const onSubmit = async (data: WorkoutFormValues) => {
		try {
			setLoading(true)

			const { message, result } = await workoutService.createWorkout(data)

			showToastSuccess(message)
			setTimeout(
				() => router.push(`/workouts/${result.id}/exercises`),
				100
			)
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<SelectExerciseModal
				bodyPartList={bodyPartList}
				targetList={targetList}
				equipmentList={equipmentList}
			/>
			<ConfirmExerciseModal />
			<div className='flex flex-col gap-y-4'>
				<TitleHeader title={title} />

				<Form {...form}>
					<form
						className='grid grid-cols-1 gap-y-4'
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor='name'>Name</FormLabel>
									<FormControl>
										<Input
											id='name'
											placeholder='Workout name'
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='date'
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor='date'>Date</FormLabel>
									<FormControl>
										<DatePicker
											value={field.value}
											onChange={(date) =>
												field.onChange(date!)
											}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='time'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Workout time</FormLabel>
									<FormControl>
										<TimePicker
											value={field.value ?? ''}
											onChange={(time) =>
												field.onChange(time)
											}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						{workout && (
							<div className='flex flex-col space-y-2'>
								<p className='text-sm font-medium leading-none'>
									Exercises
								</p>
								<Button
									type='button'
									variant='outline'
									className={cn(
										'flex items-center text-sm font-normal w-full justify-start',
										workout.exercises.length === 0 &&
											'text-muted-foreground'
									)}
									onClick={() =>
										router.push(
											`/workouts/${workout.id}/exercises`
										)
									}
								>
									<Icons.dumbbell className='w-4 h-4 mr-2' />
									<span>
										Manage exercises (
										{workout.exercises.length})
									</span>
									<Icons.externalLink className='w-4 h-4 ml-auto' />
								</Button>
							</div>
						)}
						{workout && (
							<div className='flex flex-col space-y-2'>
								<p className='text-sm font-medium leading-none'>
									Images
								</p>
								<Button
									type='button'
									variant='outline'
									className={cn(
										'flex items-center text-sm font-normal w-full justify-start',
										!workout.images &&
											'text-muted-foreground'
									)}
									onClick={() =>
										router.push(
											`/workouts/${workout.id}/images`
										)
									}
								>
									<Icons.image className='w-4 h-4 mr-2' />
									<span>Manage images</span>
									<Icons.externalLink className='w-4 h-4 ml-auto' />
								</Button>
							</div>
						)}

						{/* <FormField
							control={form.control}
							name='exercises'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Exercises</FormLabel>
									<FormControl>
										<Button
											disabled={!workout}
											className={cn(
												'flex items-center text-muted-foreground text-sm font-normal w-full justify-start'
											)}
											variant='outline'
											type='button'
											onClick={() =>
												router.push(
													'/workouts/new/exercises'
												)
											}
										>
											<Icons.dumbbell className='w-4 h-4 mr-2' />
											<span>Add exercise</span>
											<Icons.externalLink className='w-4 h-4 ml-auto' />
										</Button>
									</FormControl>
								</FormItem>
							)}
						/> */}

						<Button disabled={loading}>
							{loading && (
								<Icons.spinner className='w-4 h-4 mr-2 animate-spin' />
							)}
							{buttonText}
						</Button>
					</form>
				</Form>
			</div>
		</>
	)
}
