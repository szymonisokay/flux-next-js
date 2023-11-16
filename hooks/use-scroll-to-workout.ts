'use client'

import { useEffect } from 'react'

export const useScrollToWorkout = () => {
	useEffect(() => {
		const timeout = setTimeout(() => {
			const todayDiv = document.querySelector('#today')
			const nextDayDiv = document.querySelectorAll('#next-day')[0]

			if (!todayDiv) {
				nextDayDiv?.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				})

				return
			}

			todayDiv.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
		}, 100)

		return () => clearTimeout(timeout)
	}, [])
}
