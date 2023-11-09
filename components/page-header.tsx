'use client'

import { ArrowLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'

type Props = {
	title: string
	description?: string
}

export const PageHeader = ({ title, description }: Props) => {
	const router = useRouter()

	return (
		<div className='flex items-center justify-between'>
			<div className='flex items-center gap-x-2 '>
				<Button
					onClick={() => router.back()}
					variant='ghost'
					size='icon'
					className='shrink-0'
				>
					<ArrowLeftIcon className='w-5 h-5' />
				</Button>

				<Heading title={title} description={description} />
			</div>
		</div>
	)
}