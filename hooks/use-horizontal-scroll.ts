'use client'

import { MouseEvent, useRef, useState } from 'react'

export const useHorizontalScroll = () => {
	const containerRef = useRef<HTMLDivElement>(null)
	const [isDragging, setIsDragging] = useState<boolean>(false)
	const [startX, setStartX] = useState<number>(0)
	const [scrollLeft, setScrollLeft] = useState<number>(0)

	const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
		setIsDragging(true)
		setStartX(e.pageX - Number(containerRef?.current?.offsetLeft))
		setScrollLeft(Number(containerRef?.current?.scrollLeft))
	}

	const onMouseUp = () => {
		setIsDragging(false)
	}

	const onMouseLeave = () => {
		setIsDragging(false)
	}

	const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
		if (!isDragging) return

		e.preventDefault()
		const x = e.pageX - Number(containerRef?.current?.offsetLeft)
		const walk = (x - startX) * 2
		containerRef.current!.scrollLeft = scrollLeft - walk
	}

	return {
		containerRef,
		onMouseDown,
		onMouseUp,
		onMouseLeave,
		onMouseMove,
	}
}
