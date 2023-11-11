'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FilterIcon, SearchIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import qs from 'query-string'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Tooltip } from '@/components/tooltip'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFilters } from '@/hooks/use-filters'
import { useModal } from '@/hooks/use-modal'
import { useEffect } from 'react'

const formSchema = z.object({
	query: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export const SearchExerciseForm = () => {
	const router = useRouter()
	const pathname = usePathname()
	const { setOpen } = useModal()
	const { query, ...filters } = useFilters()

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			query,
		},
	})

	const onSubmit = async (values: FormValues) => {
		const url = qs.stringifyUrl(
			{
				url: pathname,
				query: { ...values, ...filters },
			},
			{ skipEmptyString: true, skipNull: true }
		)

		router.push(url)
		router.refresh()
	}

	useEffect(() => {
		form.setValue('query', query)
	}, [query])

	return (
		<Form {...form}>
			<form
				className='flex flex-col'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<div className='flex items-center gap-4 py-4'>
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
					<Tooltip label='Open filters' side='bottom' align='end'>
						<Button
							type='button'
							variant='outline'
							className='shrink-0'
							onClick={() => setOpen('exerciseFilters')}
						>
							<FilterIcon className='w-5 h-5' />
						</Button>
					</Tooltip>
				</div>
			</form>
		</Form>
	)
}
