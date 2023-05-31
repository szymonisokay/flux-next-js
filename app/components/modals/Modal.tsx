'use client'

import { useCallback, useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import IconButton from '../ui/IconButton'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	title: string
	body?: React.ReactElement
	footer?: React.ReactElement
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	title,
	body,
	footer,
}) => {
	const [showModal, setShowModal] = useState<boolean>(isOpen)

	useEffect(() => {
		setShowModal(isOpen)
	}, [isOpen])

	const handleClose = useCallback(() => {
		setShowModal(false)

		setTimeout(() => {
			onClose()
		}, 300)
	}, [onClose])

	return (
		<>
			<div
				className={`fixed inset-0 z-50 flex items-end justify-center overflow-x-hidden overflow-y-hidden  outline-none bg-neutral-900/50 focus:outline-none duration-150
        ${showModal ? 'pointer-events-auto' : 'pointer-events-none'}
        ${showModal ? 'opacity-100' : 'opacity-0'}
      `}
			>
				<div
					className='
            relative
            w-[90%]
            h-[90%]
            my-6
            mx-auto
          '
				>
					<div
						className={`
            duration-300
            ${showModal ? 'translate-y-0' : 'translate-y-full'}
            ${showModal ? 'opacity-100' : 'opacity-0'}
          `}
					>
						<div className='relative flex flex-col w-full h-full border-0 rounded-lg outline-none bg-neutral-100 focus:outline-none'>
							<div className='flex items-center p-4 rounded-t justify-center relative border-b-[1px]'>
								<div className='absolute right-4'>
									<IconButton
										icon={IoMdClose}
										onClick={handleClose}
									/>
								</div>
								<div className='text-base font-semibold'>
									{title}
								</div>
							</div>

							<div className='relative flex-auto'>{body}</div>

							<div className='relative p-4 border-t-[1px]'>
								{footer}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Modal
