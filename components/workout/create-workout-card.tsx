'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'

export const CreateWorkoutCard = () => {
	return (
		<div className='p-4 mt-2 duration-200 border rounded-md bg-accent'>
			<Heading
				title='No workouts for the following days'
				description='Create your next workout'
			/>

			<div className='flex justify-end w-full mt-4'>
				<Link href='/workouts/new'>
					<Button variant='colored' size='sm' className='group'>
						Create
						<ArrowRight className='w-4 h-4 ml-2 duration-200 group-hover:translate-x-[2px]' />
					</Button>
				</Link>
			</div>
		</div>
	)
}
