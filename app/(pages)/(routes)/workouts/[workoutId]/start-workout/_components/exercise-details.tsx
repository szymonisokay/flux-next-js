'use client'

import { Set, Training } from '@prisma/client'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'

import { Heading } from '@/components/heading'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

type Props = {
	training: Training & {
		sets: Set[]
	}
}

export const ExerciseDetails = ({ training }: Props) => {
	const params = useParams()
	const router = useRouter()

	const { id: trainingId, sets, duration } = training

	const onToggleCompleteSet = async (completed: boolean, setId: string) => {
		try {
			await axios.put(
				`/api/workouts/${params?.workoutId}/trainings/${trainingId}/sets`,
				{
					setId,
					completed,
				}
			)
			router.refresh()
		} catch (error) {
			console.log(error)
		}
	}

	const onToggleCompleteDuration = async (completed: boolean) => {
		try {
			await axios.put(
				`/api/workouts/${params?.workoutId}/trainings/${trainingId}/duration`,
				{
					completed,
				}
			)
			router.refresh()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='mt-4'>
			<Heading title='Exercise details' />
			<div className='flex flex-col gap-2 mt-2'>
				{!!sets.length && (
					<>
						{sets
							.sort((a, b) => a.order - b.order)
							.map((set, index) => (
								<div
									key={set.id}
									className={cn(
										'flex items-center gap-4',
										set.completed && 'opacity-50'
									)}
								>
									<Checkbox
										checked={set.completed}
										onCheckedChange={(checked) =>
											onToggleCompleteSet(
												Boolean(checked),
												set.id
											)
										}
									/>
									<div className='p-2 px-4 rounded-md bg-accent'>
										{++index}. Set
									</div>

									<div className='flex items-center gap-4 ml-auto'>
										<div className='flex flex-col'>
											<span>Reps</span>
											<span className='text-sm text-secondary'>
												{set.reps}
											</span>
										</div>
										<div className='flex flex-col'>
											<span>Weight</span>
											<span className='text-sm text-secondary'>
												{set.weight} kg
											</span>
										</div>
									</div>
								</div>
							))}
					</>
				)}
			</div>

			{duration && (
				<div className='flex items-center gap-4'>
					<Checkbox
						checked={training.completed}
						onCheckedChange={(checked) =>
							onToggleCompleteDuration(Boolean(checked))
						}
					/>

					<span>Duration</span>

					<span className='ml-auto text-secondary'>{duration}</span>
				</div>
			)}
		</div>
	)
}
