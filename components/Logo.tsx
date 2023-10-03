import Image, { ImageProps } from 'next/image'

import logo from '@/public/images/Logo.png'

type Props = ImageProps & {
	small?: boolean
}

export const Logo = ({ small, ...props }: Props) => {
	return (
		<Image
			{...props}
			src={logo}
			alt='logo'
			width={small ? '100' : '150'}
			height='100'
		/>
	)
}
