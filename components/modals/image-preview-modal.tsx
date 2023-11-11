import { DialogClose } from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'
import Image from 'next/image'

import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { useModal } from '@/hooks/use-modal'

export const ImagePreviewModal = () => {
	const { open, type, setClose, data } = useModal()

	return (
		<Dialog open={open && type === 'imagePreview'} onOpenChange={setClose}>
			<DialogContent>
				<DialogHeader className='text-left '>
					<div className='flex justify-between'>
						<Heading
							title='Exercise preview'
							description='Preview of the exercise'
						/>

						<DialogClose asChild>
							<Button variant='ghost' size='icon'>
								<XIcon className='w-5 h-5' />
							</Button>
						</DialogClose>
					</div>
				</DialogHeader>
				<div className='relative w-full overflow-hidden border rounded-md aspect-square bg-primary'>
					{data?.imageUrl && (
						<Image priority fill src={data?.imageUrl} alt='' />
					)}
				</div>
			</DialogContent>
		</Dialog>
	)
}
