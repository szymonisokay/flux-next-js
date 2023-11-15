'use client'

import { Training } from '@prisma/client'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'

import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'

type Props = {
	trainings: Training[]
}

export const WorkoutCompleted = ({ trainings }: Props) => {
	const params = useParams()

	const [showConfetti, setShowConfetti] = useState<boolean>(false)

	useEffect(() => {
		if (!trainings.length) {
			setShowConfetti(true)
		}
	}, [trainings])

	return (
		<>
			{showConfetti && (
				<>
					<Confetti recycle={true} numberOfPieces={100} />

					<div className='flex flex-col gap-4 mt-24 text-center'>
						<p className='text-6xl'>💯</p>

						<Heading
							title='Congratulations'
							description='You have completed your workout'
						/>

						<Link
							replace
							prefetch={false}
							href={`/workouts/${params?.workoutId}/edit`}
						>
							<Button variant='colored' size='sm'>
								Go back
							</Button>
						</Link>
					</div>
				</>
			)}
		</>
	)
}
