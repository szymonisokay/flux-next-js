import { DialogClose } from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'

import { ExerciseFiltersForm } from '@/components/forms/exercise-filters-form'
import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { useModal } from '@/hooks/use-modal'

export const ExerciseFiltersModal = () => {
	const { open, type, setClose } = useModal()

	return (
		<Dialog
			open={open && type === 'exerciseFilters'}
			onOpenChange={setClose}
		>
			<DialogContent className='md:max-w-2xl'>
				<DialogHeader className='text-left '>
					<div className='flex justify-between'>
						<Heading
							title='Filters'
							description='Filter out exercises'
						/>

						<DialogClose asChild>
							<Button variant='ghost' size='sm'>
								<XIcon className='w-5 h-5' />
							</Button>
						</DialogClose>
					</div>
				</DialogHeader>

				<ExerciseFiltersForm />
			</DialogContent>
		</Dialog>
	)
}
