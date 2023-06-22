import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import { ReadonlyURLSearchParams } from 'next/navigation'

import qs from 'query-string'

export const updateParams = (
	query: { [k: string]: any },
	router: AppRouterInstance,
	params: ReadonlyURLSearchParams | null,
	pathname: string | null
) => {
	if (params) {
		let currentQuery: any = {
			...qs.parse(params.toString()),
		}

		console.log(currentQuery)

		for (const [key, value] of Object.entries(query)) {
			currentQuery = {
				...currentQuery,
				pageSize: 20,
				[key]: value,
			}
		}

		console.log(query)

		const url = qs.stringifyUrl(
			{
				url: pathname || '/',
				query: currentQuery,
			},
			{ skipNull: true }
		)

		router.push(url)
	}
}
