export const useScrollTop = () => {
	const scrollTop = () => {
		setTimeout(() => {
			const top = document.querySelector('#top')

			top?.scrollIntoView({
				block: 'end',
				behavior: 'smooth',
			})
		}, 200)
	}

	return {
		scrollTop,
	}
}
