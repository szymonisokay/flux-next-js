import Link from 'next/link'
import { MenuItem } from '../../interfaces/menuItem.interface'
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	navigationMenuTriggerStyle,
} from '../ui/navigation-menu'

interface MenuProps {
	menuItems: MenuItem[]
}

const Menu: React.FC<MenuProps> = ({ menuItems }) => {
	return (
		<NavigationMenu className='flex-col gap-2 list-none'>
			{menuItems.map(({ label, action, href, icon: Icon }) => (
				<NavigationMenuItem
					className='w-full'
					key={label}
					onClick={action}
				>
					<Link href={href} legacyBehavior passHref>
						<NavigationMenuLink
							className={`${navigationMenuTriggerStyle()} !w-full gap-3 !text-base !justify-start !py-3 !h-auto !leading-none`}
						>
							<div>{<Icon size={18} />}</div>
							{label}
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
			))}
		</NavigationMenu>
	)
}

export default Menu
