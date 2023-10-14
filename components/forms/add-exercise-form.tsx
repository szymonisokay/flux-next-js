'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { bodyParts, equipment, targets } from '@/config/exercise-config'

const formSchema = z.object({
	bodyPart: z.string().optional(),
	equipment: z.string().optional(),
	target: z.string().optional(),
	exercisesNumber: z.string().nonempty(),
})

type FormValues = z.infer<typeof formSchema>

export const AddExerciseForm = () => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			bodyPart: searchParams.get('bodyPart') || '',
			equipment: searchParams.get('equipment') || '',
			target: searchParams.get('target') || '',
			exercisesNumber: searchParams.get('exercisesNumber') || '3',
		},
	})

	const loading = form.formState.isSubmitting

	const onSubmit = async (values: FormValues) => {
		const url = qs.stringifyUrl(
			{
				url: pathname,
				query: { ...values, generate: true },
			},
			{ skipEmptyString: true, skipNull: true }
		)

		router.replace(url)
		router.refresh()
	}

	return (
		<Form {...form}>
			<form
				className='flex flex-col'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<div className='grid grid-cols-2 gap-4 py-4 lg:grid-cols-4'>
					<FormField
						control={form.control}
						name='bodyPart'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Body part
									<span className='inline-block ml-1 text-xs text-secondary'>
										(optional)
									</span>
								</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Select body part' />
										</SelectTrigger>
									</FormControl>
									<SelectContent className='max-h-[250px]'>
										<SelectItem
											className='text-secondary'
											value=''
										>
											Select body part
										</SelectItem>
										{bodyParts.map((value) => (
											<SelectItem
												key={value}
												value={value}
											>
												{value}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='equipment'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Equipment
									<span className='inline-block ml-1 text-xs text-secondary'>
										(optional)
									</span>
								</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Select equipment' />
										</SelectTrigger>
									</FormControl>
									<SelectContent className='max-h-[250px]'>
										<SelectItem
											className='text-secondary'
											value=''
										>
											Select equipment
										</SelectItem>
										{equipment.map((value) => (
											<SelectItem
												key={value}
												value={value}
											>
												{value}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='target'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Target
									<span className='inline-block ml-1 text-xs text-secondary'>
										(optional)
									</span>
								</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Select target' />
										</SelectTrigger>
									</FormControl>
									<SelectContent className='max-h-[250px]'>
										<SelectItem
											className='text-secondary'
											value=''
										>
											Select target
										</SelectItem>
										{targets.map((value) => (
											<SelectItem
												key={value}
												value={value}
											>
												{value}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='exercisesNumber'
						render={({ field }) => (
							<FormItem>
								<FormLabel>No. of exercises</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Select target' />
										</SelectTrigger>
									</FormControl>
									<SelectContent className='max-h-[250px]'>
										{['3', '4', '5', '6', '7'].map(
											(value) => (
												<SelectItem
													key={value}
													value={value}
												>
													{value}
												</SelectItem>
											)
										)}
									</SelectContent>
								</Select>
							</FormItem>
						)}
					/>
				</div>
				<Button
					variant='colored'
					disabled={loading}
					className='sm:self-end'
				>
					{loading && (
						<Loader2Icon className='w-4 h-4 mr-2 animate-spin' />
					)}
					Generate
				</Button>
			</form>
		</Form>
	)
}
