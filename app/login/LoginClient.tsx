'use client'

import { useState } from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'

import Logo from '../components/Logo'
import Card from '../components/ui/Card'
import Heading from '../components/ui/Heading'
import Input from '../components/inputs/Input'
import Button from '../components/ui/Button'

const LoginClient = () => {
	const [isLoading, setIsLoading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true)

		setTimeout(() => setIsLoading(false), 3000)
	}

	return (
		<div className='container flex flex-col items-center justify-center h-full gap-4'>
			<Logo />
			<Card center>
				<Heading
					title='Welcome back in Flux!'
					subtitle='Login into your account'
				/>
				<Input
					id='email'
					label='Email'
					type='email'
					register={register}
					errors={errors}
					disabled={isLoading}
					required
				/>
				<Input
					id='password'
					label='Password'
					type='password'
					register={register}
					errors={errors}
					disabled={isLoading}
					required
				/>
				<Button
					text='Login'
					disabled={isLoading}
					isLoading={isLoading}
					onClick={handleSubmit(onSubmit)}
				/>
			</Card>
		</div>
	)
}

export default LoginClient
