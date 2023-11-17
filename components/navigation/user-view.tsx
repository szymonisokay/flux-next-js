import { UserButton } from '@clerk/nextjs'

export const UserView = async () => {
	return (
		<UserButton
			afterSignOutUrl='/'
			appearance={{
				elements: {
					userButtonTrigger: 'focus:shadow-none',
					userButtonAvatarBox: 'w-7 h-7',
					userButtonPopoverCard: 'rounded-md shadow-xl py-4 pt-4',
					userPreview: 'px-4 gap-x-2',
					userPreviewAvatarBox: 'w-9 h-9',
					userPreviewMainIdentifier: 'text-primary font-semibold',
					userPreviewSecondaryIdentifier: 'text-secondary',
					userButtonPopoverActions: 'mt-4',
					userButtonPopoverActionButton: 'px-4',
					userButtonPopoverActionButtonIcon: 'w-4 h-4 text-primary',
					userButtonPopoverActionButtonText: 'text-primary',
					userButtonPopoverFooter: 'text-secondary p-0 px-4 mt-4',
				},
			}}
		/>
	)
}
