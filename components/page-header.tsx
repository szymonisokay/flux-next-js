'use client'

import { ArrowLeftIcon, PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Heading } from '@/components/heading'
import { Tooltip } from '@/components/tooltip'
import { Button } from '@/components/ui/button'

type Props = {
	title: string
	description?: string
	actionLabel?: string
	actionHref?: string
}

export const PageHeader = ({
	title,
	description,
	actionLabel,
	actionHref,
}: Props) => {
	const router = useRouter()

	return (
		<div className='flex items-center justify-between'>
			<div className='flex items-center gap-x-2'>
				<Button
					onClick={() => router.back()}
					variant='ghost'
					size='icon'
				>
					<ArrowLeftIcon className='w-5 h-5' />
				</Button>

				<Heading title={title} description={description} />
			</div>

			{actionHref && (
				<Tooltip side='bottom' align='end' label={actionLabel}>
					<Button
						onClick={() => router.push(actionHref)}
						variant='colored'
					>
						<PlusIcon className='w-5 h-5' />
					</Button>
				</Tooltip>
			)}
		</div>
	)
}
