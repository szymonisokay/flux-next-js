'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Training, Workout } from '@prisma/client'
import axios from 'axios'
import { format } from 'date-fns'
import {
	CalendarIcon,
	DumbbellIcon,
	ExternalLinkIcon,
	Loader2Icon,
	PlayCircleIcon,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { FloatingActionButton } from '@/components/floating-action-button'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const formSchema = z.object({
	name: z.string().nonempty({
		message: 'Enter your workout name',
	}),
	description: z.string().nullable(),
	date: z.string().nonempty({
		message: 'Enter valid date',
	}),
	duration: z.string().nullable(),
	start: z.string().nullable(),
	end: z.string().nullable(),
	weight: z
		.string()
		.regex(/^\d{0,8}(\.\d{1,2})?$/, {
			message: 'Enter valid weight',
		})
		.nullable(),
})

type FormValues = z.infer<typeof formSchema>

type Props = {
	workout: Workout & {
		trainings: Training[]
	}
}

export const EditWorkoutForm = ({ workout }: Props) => {
	const router = useRouter()

	const form = useForm<FormValues>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: { ...workout, weight: String(workout.weight || '') },
	})

	const loading = form.formState.isSubmitting

	const onSubmit = async (values: FormValues) => {
		try {
			await axios.put(`/api/workouts/${workout.id}`, {
				...values,
				weight: values.weight ? Number(values.weight) : null,
			})

			router.refresh()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			{!!workout.trainings.length && (
				<FloatingActionButton
					href={`/workouts/${workout.id}/start-workout`}
					label='Start working out'
					icon={PlayCircleIcon}
				/>
			)}
			<Form {...form}>
				<form
					className='flex flex-col gap-y-4'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder='Workout name'
										disabled={loading}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Description
									<span className='inline-block ml-1 text-xs text-secondary'>
										(optional)
									</span>
								</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										value={field.value ?? ''}
										rows={6}
										placeholder='Workout description'
										disabled={loading}
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
								<FormLabel>Date</FormLabel>
								<FormControl>
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant='outline'
												className={cn(
													'flex justify-start w-full text-left font-normal',
													!field.value &&
														'text-muted-foreground'
												)}
												disabled={loading}
											>
												<CalendarIcon className='w-4 h-4 mr-2' />
												{field.value ? (
													format(
														new Date(field.value),
														'PPP'
													)
												) : (
													<span>Pick a date</span>
												)}
											</Button>
										</PopoverTrigger>
										<PopoverContent className='w-auto p-0'>
											<Calendar
												mode='single'
												selected={new Date(field.value)}
												onSelect={(date) =>
													field.onChange(
														date?.toISOString()
													)
												}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

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
										placeholder='Workout duration'
										disabled={loading}
										value={field.value || ''}
									/>
								</FormControl>
								<FormDescription>
									Enter workout duration time, e.g. 50 min
								</FormDescription>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='weight'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Weight
									<span className='inline-block ml-1 text-xs text-secondary'>
										(optional)
									</span>
								</FormLabel>
								<FormControl>
									<div className='relative'>
										<Input
											{...field}
											placeholder='Your weight after the workout'
											className='pr-9'
											disabled={loading}
											value={field.value || ''}
										/>
										<span className='absolute text-sm top-[10px] right-3 text-secondary'>
											kg
										</span>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='flex flex-col space-y-2'>
						<Label>Exercises</Label>
						<Link
							href={`/workouts/${workout.id}/exercises`}
							className='inline-block w-full'
						>
							<Button
								variant='outline'
								className='justify-start w-full'
							>
								<DumbbellIcon className='w-4 h-4 mr-2' />
								<span>
									Manage exercises ({workout.trainings.length}
									)
								</span>

								<ExternalLinkIcon className='w-4 h-4 ml-auto text-secondary' />
							</Button>
						</Link>
					</div>

					<Button variant='colored' disabled={loading}>
						{loading && (
							<Loader2Icon className='w-4 h-4 mr-2 animate-spin' />
						)}
						Update
					</Button>
				</form>
			</Form>
		</>
	)
}
