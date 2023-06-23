'use client'

import { DialogClose } from '@radix-ui/react-dialog'
import { Icons } from '../icons'
import { Button } from '../ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '../ui/dialog'

interface ModalProps {
	title: string
	subtitle?: string
	children?: React.ReactNode
	footer?: React.ReactElement
	isOpen?: boolean
	onClose: () => void
}

const Modal: React.FC<ModalProps> = ({
	subtitle,
	title,
	children,
	footer,
	isOpen,
	onClose,
}) => {
	return (
		<Dialog open={isOpen}>
			<DialogContent className='p-0 py-4 h-[100vh]'>
				<DialogClose asChild className='absolute right-4 top-4'>
					<Button variant='ghost' size='sm' onClick={onClose}>
						<Icons.close size={20} />
					</Button>
				</DialogClose>
				<DialogHeader className='py-2'>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{subtitle}</DialogDescription>
				</DialogHeader>
				<div className='flex flex-col gap-4 overflow-hidden'>
					<div className='h-full px-4 pt-4 '>{children}</div>
				</div>
				<DialogFooter>{footer}</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default Modal
