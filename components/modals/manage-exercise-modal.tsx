import { DialogClose } from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'

import { ExerciseCard } from '@/components/exercise/exercise-card'
import { ManageExerciseDetailsForm } from '@/components/forms/manage-exercise-details-form'
import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { useModal } from '@/hooks/use-modal'

export const ManageExerciseModal = () => {
	const { open, type, setClose, data } = useModal()

	if (!data?.exercise) {
		return null
	}

	const { exercise, training } = data

	return (
		<Dialog
			open={open && type === 'manageExercise'}
			onOpenChange={setClose}
		>
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
					<div className='flex flex-col gap-2'>
						<ExerciseCard
							highlight
							showPreview={false}
							exercise={exercise}
						>
							<ExerciseCard.Details />
						</ExerciseCard>
					</div>

					<div>
						<Heading
							title='Manage sets or duration'
							description='Specify number of reps and weight for each set'
						/>

						<ManageExerciseDetailsForm
							exercise={exercise}
							training={training}
						/>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
