'use client'

import { useSearchParams } from 'next/navigation'

type Props = {
	total: number
	pageSize: number
}

export const usePagination = ({ total, pageSize }: Props) => {
	const params = useSearchParams()

	const page = Number(params.get('page')) || 1
	const pageCount = Math.ceil(total / pageSize)

	return {
		page,
		pageCount,
	}
}
