'use client'

import { useCallback, useMemo } from 'react'
import { Icons } from '../icons'

import { PaginationModel } from '../../interfaces/pagination.interface'
import { Button } from '../ui/button'

interface PaginationProps {
	total: number
	pagination: PaginationModel
	onPaginationChange: (pagination: PaginationModel) => void
}

const Pagination: React.FC<PaginationProps> = ({
	total,
	pagination,
	onPaginationChange,
}) => {
	const totalPages = useMemo(() => {
		return Math.ceil(total / pagination.pageSize)
	}, [total, pagination.pageSize])

	const onPageChange = useCallback(
		(page: number) => {
			onPaginationChange({
				page,
				pageSize: pagination.pageSize,
			})

			setTimeout(() => {
				document.querySelector('.no-scrollbar')?.scrollTo({
					top: 0,
					left: 0,
					behavior: 'smooth',
				})
			}, 200)
		},
		[setTimeout]
	)

	return (
		<div className='relative flex items-center justify-center gap-3'>
			<Button
				variant='ghost'
				size='sm'
				disabled={pagination.page === 1}
				onClick={() => onPageChange(pagination.page - 1)}
			>
				<Icons.chevronLeft size={20} />
			</Button>
			<p>
				page <span className='font-bold'>{pagination.page}</span> of{' '}
				<span className='font-bold'>{totalPages}</span>{' '}
			</p>
			<Button
				variant='ghost'
				size='sm'
				disabled={pagination.page === totalPages}
				onClick={() => onPageChange(pagination.page + 1)}
			>
				<Icons.chevronRight size={20} />
			</Button>
		</div>
	)
}

export default Pagination
