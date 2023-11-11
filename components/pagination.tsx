'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import qs from 'query-string'
import { useRef } from 'react'
import ReactPaginate from 'react-paginate'

import { Tooltip } from '@/components/tooltip'
import { Button } from '@/components/ui/button'
import { useFilters } from '@/hooks/use-filters'
import { usePagination } from '@/hooks/use-pagination'
import { useScrollTop } from '@/hooks/use-scroll-top'

type Props = {
	total: number
	pageSize: number
}

export const Pagination = ({ total, pageSize }: Props) => {
	const prevRef = useRef<HTMLButtonElement>(null)
	const nextRef = useRef<HTMLButtonElement>(null)

	const pathname = usePathname()
	const router = useRouter()
	const filters = useFilters()
	const { page, pageCount } = usePagination({ total, pageSize })

	const { scrollTop } = useScrollTop()

	const onPageChange = (page: number) => {
		const url = qs.stringifyUrl(
			{
				url: pathname ?? '',
				query: { ...filters, page },
			},
			{ skipEmptyString: true, skipNull: true }
		)

		router.push(url, { scroll: false })
		scrollTop()
	}

	return (
		<ReactPaginate
			pageCount={pageCount}
			forcePage={page - 1}
			marginPagesDisplayed={1}
			pageRangeDisplayed={1}
			renderOnZeroPageCount={null}
			onPageChange={({ selected }) => onPageChange(++selected)}
			previousLabel={
				<Tooltip label='Previous page' align='center'>
					<Button
						ref={prevRef}
						disabled={page === 1}
						variant='ghost'
						size='sm'
					>
						<ArrowLeft className='w-5 h-5' />
					</Button>
				</Tooltip>
			}
			nextLabel={
				<Tooltip label='Next page' align='center'>
					<Button
						ref={nextRef}
						disabled={page === pageCount}
						variant='ghost'
						size='sm'
					>
						<ArrowRight className='w-5 h-5' />
					</Button>
				</Tooltip>
			}
			containerClassName='flex items-center justify-center pt-4 gap-2 w-full'
			activeLinkClassName='py-2 px-3 shrink-0 rounded-md bg-primary-color hover:bg-primary-color cursor-default duration-200'
			pageLinkClassName='py-2 px-3 shrink-0 duration-200 rounded-md hover:bg-accent'
			disabledLinkClassName='cursor-default'
			breakLinkClassName='px-1'
		/>
	)
}
