'use client'

import { Skeleton } from '../ui/skeleton'

interface CardLoadingProps {
	cards?: number
}

export const CardLoading = ({ cards = 3 }: CardLoadingProps) => {
	const cardList = Array.from({ length: cards }).map((_, i) => i)

	return (
		<div className='flex flex-col w-full gap-y-4'>
			{cardList.map((value) => (
				<div key={value} className='flex items-start gap-x-4'>
					<Skeleton className='w-20 h-20 rounded-md' />
					<div className='space-y-2'>
						<Skeleton className='h-4 w-[250px]' />
						<Skeleton className='h-8 w-[200px]' />
					</div>
				</div>
			))}
		</div>
	)
}
