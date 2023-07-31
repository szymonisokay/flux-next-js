'use client'

import { DialogClose } from '@radix-ui/react-dialog'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'

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
			<DialogContent className='p-4 h-[100vh]'>
				<DialogClose asChild className='absolute right-4 top-4'>
					<Button variant='ghost' size='sm' onClick={onClose}>
						<Icons.close size={20} />
					</Button>
				</DialogClose>
				<DialogHeader className='pt-2'>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{subtitle}</DialogDescription>
				</DialogHeader>
				<div className='h-full'>{children}</div>
				<DialogFooter>{footer}</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default Modal
