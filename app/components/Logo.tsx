import Image from 'next/image'
import logo from '../../public/images/Logo.svg'

const Logo = () => {
	return <Image src={logo} alt='logo' width='150' height='100' />
}

export default Logo
