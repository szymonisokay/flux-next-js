'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Workout } from '@prisma/client'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

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
import { Textarea } from '@/components/ui/textarea'
import { format } from 'date-fns'
import { CalendarIcon, Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Calendar } from '../../../../../components/ui/calendar'
import { cn } from '../../../../../lib/utils'

const formSchema = z.object({
	name: z.string().nonempty(),
	description: z.string().nullable(),
	date: z.string().nonempty(),
})

type FormValues = z.infer<typeof formSchema>

type Props = {
	workout: Workout | null
}

export const Client = ({ workout }: Props) => {
	const router = useRouter()

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: workout || {
			name: '',
			description: '',
			date: '',
		},
	})

	const loading = form.formState.isSubmitting

	const onSubmit = async (values: FormValues) => {
		try {
			const response = await axios.post('/api/workouts', values)
			const workoutId = await response.data

			form.reset()
			router.refresh()
			router.push(`/workouts/${workoutId}/edit`)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Form {...form}>
			<form
				className='flex flex-col mt-4 gap-y-3'
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
						</FormItem>
					)}
				/>

				<Button variant='colored' disabled={loading}>
					{loading && (
						<Loader2Icon className='w-4 h-4 mr-2 animate-spin' />
					)}
					{workout ? 'Update' : 'Create'}
				</Button>
			</form>
		</Form>
	)
}
