'use client'

import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Training } from '@prisma/client'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'

type Props = {
	trainings: Training[]
}

export const WorkoutCompleted = ({ trainings }: Props) => {
	const params = useParams()
	const router = useRouter()

	const [showConfetti, setShowConfetti] = useState<boolean>(false)

	useEffect(() => {
		if (!trainings.length) {
			setShowConfetti(true)
		}
	}, [trainings])

	// useEffect(() => {
	// 	let timeout: NodeJS.Timeout

	// 	if (showConfetti) {
	// 		timeout = setTimeout(() => {
	// 			setShowConfetti(false)
	// 			router.replace(`/workouts/${params.workoutId}/edit`)
	// 		}, 5000)
	// 	}

	// 	return () => clearTimeout(timeout)
	// }, [showConfetti])

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
							href={`/workouts/${params.workoutId}/edit`}
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
