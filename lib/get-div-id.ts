import { compareDesc, isToday } from 'date-fns'

export const getCorrectDivIds = (date: string) => {
	if (isToday(new Date(date))) {
		return 'today'
	}

	if (compareDesc(Date.now(), new Date(date)) === 1) {
		return 'next-day'
	}

	return ''
}
