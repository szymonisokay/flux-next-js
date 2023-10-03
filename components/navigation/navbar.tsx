import { MenuIcon } from 'lucide-react'
import { Button } from '../ui/button'

export const Navbar = () => {
	return (
		<header>
			<div>
				<Button variant='ghost' size='icon'>
					<MenuIcon className='w-5 h-5' />
				</Button>
			</div>
		</header>
	)
}
