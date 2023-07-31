'use client'

import { useRouter } from 'next/navigation'
import { Icons } from '../icons'
import { Button } from '../ui/button'

interface TitleHeaderProps {
	title?: string | null
	subtitle?: string
	children?: React.ReactNode
}

const TitleHeader: React.FC<TitleHeaderProps> = ({
	title,
	subtitle,
	children,
}) => {
	const router = useRouter()

	return (
		<div className='flex items-center gap-4'>
			<Button
				variant='ghost'
				size='sm'
				onClick={() => {
					router.back(), router.refresh()
				}}
			>
				<Icons.arrowLeft size={20} />
			</Button>
			<div className='flex flex-col space-y-0'>
				<p
					className='text-lg font-semibold truncate'
					title={title ? title : ''}
				>
					{title}
				</p>
				<p className='text-sm text-muted-foreground'>{subtitle}</p>
			</div>

			<div className='ml-auto'>{children}</div>
		</div>
	)
}

export default TitleHeader
