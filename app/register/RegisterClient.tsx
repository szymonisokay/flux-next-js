'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import Logo from '../../components/Logo'
import Input from '../../components/inputs/Input'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Heading from '../../components/ui/Heading'

import authService from '../../services/authService'
import { showToastError, showToastSuccess } from '../../utils/showToast'

const RegisterClient = () => {
	const router = useRouter()

	const [isLoading, setIsLoading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	})

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		setIsLoading(true)

		try {
			const { message } = await authService.register(data)

			showToastSuccess(message)
			router.push('/login')
		} catch (error: any) {
			showToastError(error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='container flex flex-col items-center justify-center h-full gap-4'>
			<Logo />
			<Card center>
				<Heading
					title='First time using Flux?'
					subtitle='Create your account'
				/>
				<Input
					id='name'
					label='Username'
					register={register}
					errors={errors}
					disabled={isLoading}
					required
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
					text='Register'
					disabled={isLoading}
					isLoading={isLoading}
					onClick={handleSubmit(onSubmit)}
				/>

				<p>
					Already have an account?{' '}
					<span
						className='text-indigo-800 cursor-pointer'
						onClick={() => router.push('/login')}
					>
						Sign in
					</span>
				</p>
			</Card>
		</div>
	)
}

export default RegisterClient
