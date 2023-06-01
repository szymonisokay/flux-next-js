import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { BiDumbbell } from 'react-icons/bi'
import { HiOutlineArchive, HiOutlineDocumentText } from 'react-icons/hi'
import { IoMdClose } from 'react-icons/io'
import { RxCalendar } from 'react-icons/rx'
import Logo from '../Logo'
import IconButton from '../ui/IconButton'
import MenuItem from './MenuItem'

interface SidebarProps {
	isOpen: boolean
	onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
	const router = useRouter()

	const navigateDashboard = useCallback(() => {
		router.push('/')

		onClose()
	}, [router, onClose])

	return (
		<div
			onClick={onClose}
			className={`fixed inset-0 z-40 bg-neutral-900/50 overflow-x-hidden overflow-y-hidden duration-150
        ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}
        ${isOpen ? 'opacity-100' : 'opacity-0'}
      `}
		>
			<div
				className={`
      h-full 
      w-[70%]
      fixed 
      z-50 
      top-0 
      left-0
      duration-150
      bg-neutral-100
      shadow-lg
      ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
      `}
			>
				<div className='flex items-center justify-between p-4 border-b-[1px]'>
					<div className='cursor-pointer' onClick={navigateDashboard}>
						<Logo small />
					</div>
					<IconButton icon={IoMdClose} onClick={onClose} />
				</div>

				<div className='flex flex-col p-4'>
					<MenuItem
						icon={RxCalendar}
						label='Calendar'
						onClick={() => {}}
					/>
					<MenuItem
						icon={BiDumbbell}
						label='Exercises'
						onClick={() => {}}
					/>
					<MenuItem
						icon={HiOutlineDocumentText}
						label='Training plans'
						onClick={() => {}}
					/>
					<MenuItem
						icon={HiOutlineArchive}
						label='Archives'
						onClick={() => {}}
					/>
				</div>
			</div>
		</div>
	)
}

export default Sidebar
