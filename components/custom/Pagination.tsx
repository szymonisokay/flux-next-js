'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Icons } from '../icons'

import useExerciseParams from '../../hooks/useExerciseParams'
import { updateParams } from '../../lib/updateParams'
import { Button } from '../ui/button'

interface PaginationProps {
	total: number
}

const Pagination: React.FC<PaginationProps> = ({ total }) => {
	const params = useSearchParams()
	const router = useRouter()
	const pathname = usePathname()
	const { page, pageSize } = useExerciseParams()

	const [currentPage, setCurrentPage] = useState<number>(page)

	const totalPages = useMemo(() => {
		return Math.ceil(total / pageSize)
	}, [total, pageSize])

	const onPageChange = useCallback(
		(page: number) => {
			onUpdateParams({ page })
			setCurrentPage(page)

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

	const onUpdateParams = useCallback(
		(query: { [key: string]: any }) => {
			updateParams(query, router, params, pathname)
		},
		[router, params, pathname]
	)

	useEffect(() => {
		console.log(page, pageSize)
		onUpdateParams({ page, pageSize })
	}, [page, pageSize])

	return (
		<div className='relative flex items-center justify-center gap-3'>
			<Button
				variant='ghost'
				size='sm'
				disabled={currentPage === 1}
				onClick={() => onPageChange(currentPage - 1)}
			>
				<Icons.chevronLeft size={20} />
			</Button>
			<p>
				page <span className='font-bold'>{currentPage}</span> of{' '}
				<span className='font-bold'>{totalPages}</span>{' '}
			</p>
			<Button
				variant='ghost'
				size='sm'
				disabled={currentPage === totalPages}
				onClick={() => onPageChange(currentPage + 1)}
			>
				<Icons.chevronRight size={20} />
			</Button>
		</div>
	)
}

export default Pagination
