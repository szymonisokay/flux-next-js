import Image, { ImageProps } from 'next/image'
import React from 'react'
import logo from '../public/images/Logo.png'

interface LogoProps extends ImageProps {
	small?: boolean
}

const Logo: React.FC<LogoProps> = ({ small, ...props }) => {
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

export default Logo
