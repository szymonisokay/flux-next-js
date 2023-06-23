export const managePagination = (
	page: string | null,
	pageSize: string | null
) => {
	const take = Number(pageSize) || 20
	const skip = (Number(page) - 1) * Number(pageSize) || 0

	return { take, skip }
}
