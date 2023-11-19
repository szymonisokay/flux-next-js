'use client'

import { ArrowLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'

type Props = {
	title: string
	description?: string
	href?: string
}

export const PageHeader = ({ title, description, href }: Props) => {
	const router = useRouter()

	return (
		<div className='flex items-center justify-between mb-4'>
			<div className='flex items-center gap-x-2 '>
				<Button
					onClick={() =>
						href ? router.replace(href) : router.back()
					}
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
