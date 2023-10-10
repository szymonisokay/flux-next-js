import { PlusIcon } from 'lucide-react'

import { PageHeader } from '@/components/page-header'
import { Tooltip } from '@/components/tooltip'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const WorkoutExercisesPage = () => {
	return (
		<>
			<div className='flex items-center justify-between gap-x-4'>
				<PageHeader
					title='Workout exercises'
					description='Manage your exercises'
				/>

				<Tooltip label='Add exercise'>
					<Button variant='colored' size='sm'>
						<PlusIcon className='w-5 h-5' />
					</Button>
				</Tooltip>
			</div>

			<div className='w-full h-[300px] relative mt-2 rounded-md overflow-hidden'>
				<Image
					fill
					src='https://v2.exercisedb.io/image/B9Vy3n9X-klUQp'
					alt=''
				/>
			</div>
		</>
	)
}

export default WorkoutExercisesPage
