import { useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { ISearchParams } from '../actions/getExercises'

export const defaultExerciseParams: ISearchParams = {
	page: 1,
	pageSize: 20,
	query: '',
}

const useExerciseParams = () => {
	const params = useSearchParams()

	for (const [key] of Object.entries(defaultExerciseParams)) {
		if (!params?.get(key)) {
			return defaultExerciseParams
		}
	}

	if (!params) {
		return defaultExerciseParams
	}

	const query: any = {
		...qs.parse(params?.toString()),
	}

	return query as ISearchParams
}

export default useExerciseParams
