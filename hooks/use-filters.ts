'use client'

import { useSearchParams } from 'next/navigation'

export const useFilters = () => {
	const params = useSearchParams()

	const query = params.get('query') || ''
	const bodyPart = params.get('bodyPart') || ''
	const equipment = params.get('equipment') || ''
	const target = params.get('target') || ''

	return {
		query,
		bodyPart,
		equipment,
		target,
	}
}
