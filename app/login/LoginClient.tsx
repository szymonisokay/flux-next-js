'use client'

import Logo from '../components/Logo'
import Card from '../components/ui/Card'
import Heading from '../components/ui/Heading'
import Input from '../components/ui/Input'

import { HiOutlineMail } from 'react-icons/hi'

const LoginClient = () => {
	return (
		<div className='container flex flex-col items-center justify-center h-full gap-4'>
			<Logo />
			<Card center>
				<Heading title='Welcome back in Flux!' subtitle='Login into your account' />
				<Input id='email' label='Email' type='email' onChange={() => {}} icon={HiOutlineMail} />
			</Card>
		</div>
	)
}

export default LoginClient
