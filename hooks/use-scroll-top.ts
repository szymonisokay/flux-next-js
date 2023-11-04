import { RefObject, useEffect } from 'react'

type Props = {
	prevRef?: RefObject<HTMLButtonElement>
	nextRef?: RefObject<HTMLButtonElement>
}

export const useScrollTop = ({ prevRef, nextRef }: Props) => {
	useEffect(() => {
		const scrollTop = () => {
			setTimeout(() => {
				const top = document.querySelector('#top')

				top?.scrollIntoView({
					block: 'end',
					behavior: 'smooth',
				})
			}, 200)
		}

		prevRef?.current?.addEventListener('click', scrollTop)
		nextRef?.current?.addEventListener('click', scrollTop)

		return () => {
			prevRef?.current?.removeEventListener('click', scrollTop)
			nextRef?.current?.removeEventListener('click', scrollTop)
		}
	}, [])
}
