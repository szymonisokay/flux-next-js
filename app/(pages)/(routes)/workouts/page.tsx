import { PageHeader } from '@/components/page-header'
import { getProfile } from '@/lib/get-profile'
import { prisma } from '@/lib/prisma'

import { Tooltip } from '@/components/tooltip'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { WorkoutsWrapper } from './_components/workouts-wrapper'

const WorkoutsPage = async () => {
	const profile = await getProfile()

	if (!profile) {
		return redirect('/')
	}

	const workouts = await prisma.workout.findMany({
		where: {
			profileId: profile.id,
		},
		orderBy: {
			date: 'asc',
		},
	})

	return (
		<>
			<div className='flex items-center justify-between gap-x-4'>
				<PageHeader
					title='Workouts'
					description='List of your workouts'
				/>

				<Link href='/workouts/new'>
					<Tooltip label='Add workout'>
						<Button variant='colored' size='icon'>
							<PlusIcon className='w-5 h-5' />
						</Button>
					</Tooltip>
				</Link>
			</div>

			<WorkoutsWrapper workouts={workouts} />
		</>
	)
}

export default WorkoutsPage