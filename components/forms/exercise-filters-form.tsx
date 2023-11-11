'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SearchIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { bodyParts, equipments, targets } from '@/config/exercise-config'
import { useFilters } from '@/hooks/use-filters'
import { useModal } from '@/hooks/use-modal'

const formSchema = z.object({
	query: z.string().optional(),
	bodyPart: z.string().optional(),
	equipment: z.string().optional(),
	target: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export const ExerciseFiltersForm = () => {
	const router = useRouter()
	const pathname = usePathname()
	const { setClose } = useModal()
	const { query, bodyPart, equipment, target } = useFilters()

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			query,
			bodyPart,
			equipment,
			target,
		},
	})

	const onSubmit = async (values: FormValues) => {
		const url = qs.stringifyUrl(
			{
				url: pathname ?? '',
				query: values,
			},
			{ skipEmptyString: true, skipNull: true }
		)

		router.push(url)
		router.refresh()
		setClose()
	}

	return (
		<Form {...form}>
			<form
				className='flex flex-col'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name='query'
					render={({ field }) => (
						<FormItem className='relative w-full space-y-0'>
							<FormControl>
								<>
									<Label
										htmlFor='search'
										className='absolute cursor-pointer top-3 left-3'
									>
										<SearchIcon className='w-4 h-4' />
									</Label>
									<Input
										{...field}
										id='search'
										placeholder='Search exercise...'
										className='pl-9'
									/>
								</>
							</FormControl>
						</FormItem>
					)}
				/>

				<div className='grid grid-cols-1 gap-4 py-4'>
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
										{equipments.map((value) => (
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
				</div>
				<Button variant='colored'>Filter</Button>
			</form>
		</Form>
	)
}
