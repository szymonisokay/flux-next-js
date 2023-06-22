'use client'

import { useRouter } from 'next/navigation'
import { Icons } from '../icons'
import { Button } from '../ui/button'

interface TitleHeaderProps {
	title?: string | null
	children?: React.ReactNode
}

const TitleHeader: React.FC<TitleHeaderProps> = ({ title, children }) => {
	const router = useRouter()

	return (
		<div className='flex items-center gap-4'>
			<Button variant='ghost' size='sm' onClick={() => router.back()}>
				<Icons.arrowLeft size={20} />
			</Button>
			<p
				className='text-lg font-semibold truncate'
				title={title ? title : ''}
			>
				{title}
			</p>

			<div className='ml-auto'>{children}</div>
		</div>
	)
}

export default TitleHeader
