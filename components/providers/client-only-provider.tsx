'use client'

import { useEffect, useState } from 'react'

type Props = {
	children: React.ReactNode
}

export const ClientOnlyProvider = ({ children }: Props) => {
	const [hasMounted, setHasMounted] = useState<boolean>(false)

	useEffect(() => {
		setHasMounted(true)
	}, [])

	if (!hasMounted) {
		return null
	}

	return <>{children}</>
}
