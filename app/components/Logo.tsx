import Image from 'next/image'
import React from 'react'
import logo from '../../public/images/Logo.svg'

interface LogoProps {
	small?: boolean
}

const Logo: React.FC<LogoProps> = ({ small }) => {
	return (
		<Image
			src={logo}
			alt='logo'
			width={small ? '100' : '150'}
			height='100'
		/>
	)
}

export default Logo
