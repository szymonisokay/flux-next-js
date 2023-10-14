import { UserButton } from '@clerk/nextjs'
import { BellIcon } from 'lucide-react'

import { Sidebar } from '@/components/navigation/sidebar'
import { Button } from '@/components/ui/button'

export const Navbar = () => {
	return (
		<header className='fixed top-0 left-0 z-50 flex items-center justify-between w-full px-4 py-3 border-b backdrop-blur-sm'>
			<Sidebar />

			<div className='flex items-center gap-x-2'>
				<Button variant='ghost' size='icon'>
					<BellIcon className='w-5 h-5 ' />
				</Button>

				<UserButton
					afterSignOutUrl='/'
					appearance={{
						elements: {
							userButtonTrigger: 'focus:shadow-none',
							userButtonAvatarBox: 'w-7 h-7',
							userButtonPopoverCard: 'rounded-md shadow-xl py-4',
							userPreview: 'px-4 gap-x-2',
							userPreviewAvatarBox: 'w-9 h-9',
							userPreviewMainIdentifier:
								'text-slate-900 font-semibold',
							userPreviewSecondaryIdentifier: 'text-slate-500',
							userButtonPopoverActions: 'mt-4',
							userButtonPopoverActionButton: 'px-4',
							userButtonPopoverActionButtonIcon: 'w-4 h-4',
							userButtonPopoverFooter:
								'text-slate-800 p-0 px-4 mt-4',
						},
					}}
				/>
			</div>
		</header>
	)
}
