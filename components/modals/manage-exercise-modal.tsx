import { DialogClose } from '@radix-ui/react-dialog'
import { DumbbellIcon, FlameIcon, HandIcon, XIcon } from 'lucide-react'

import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { useModal } from '@/hooks/use-modal'
import Image from 'next/image'
import { ManageExerciseDetailsForm } from '../forms/manage-exercise-details-form'

export const ManageExerciseModal = () => {
	const { open, type, setClose, data } = useModal()

	if (!data?.exercise) {
		return null
	}

	const { exercise } = data

	return (
		<Dialog open={open && type === 'addExercise'} onOpenChange={setClose}>
			<DialogContent className='md:max-w-2xl'>
				<DialogHeader className='text-left '>
					<div className='flex justify-between'>
						<Heading
							title='Manage exercise'
							description='Specify sets to this exercise'
						/>

						<DialogClose asChild>
							<Button variant='ghost' size='icon'>
								<XIcon className='w-5 h-5' />
							</Button>
						</DialogClose>
					</div>
				</DialogHeader>
				<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
					<div className='flex flex-col gap-2 p-4 border rounded-md bg-accent'>
						<div className='flex gap-3 md:flex-col '>
							<div className='relative overflow-hidden bg-white border rounded-md w-36 h-36 md:w-full md:h-52 shrink-0'>
								<Image
									fill
									priority
									src={exercise.gifUrl}
									alt={exercise.name}
									className='md:object-contain'
								/>
							</div>
							<div>
								<Heading title={exercise.name} />
								<div className='flex flex-wrap mt-3 gap-x-6 gap-y-3'>
									<div className='flex items-center text-secondary'>
										<HandIcon className='w-4 h-4 mr-2' />
										<span className='text-sm leading-none'>
											{exercise.bodyPart}
										</span>
									</div>

									<div className='flex items-center text-secondary'>
										<DumbbellIcon className='w-4 h-4 mr-2' />
										<span className='text-sm leading-none'>
											{exercise.equipment}
										</span>
									</div>

									<div className='flex items-center text-secondary'>
										<FlameIcon className='w-4 h-4 mr-2' />
										<span className='text-sm leading-none'>
											{exercise.target}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div>
						<Heading
							title='Manage sets or duration'
							description='Specify number of reps and weight for each set'
						/>

						<ManageExerciseDetailsForm exercise={exercise} />
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
