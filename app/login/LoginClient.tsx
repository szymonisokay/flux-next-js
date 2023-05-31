'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import Logo from '../components/Logo'
import Input from '../components/inputs/Input'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Heading from '../components/ui/Heading'

import { SignInResponse, signIn } from 'next-auth/react'
import IconButtonWithText from '../components/ui/IconButtonWithText'
import { showToastError, showToastSuccess } from '../utils/showToast'

import { FaGithub, FaGoogle } from 'react-icons/fa'

const LoginClient = () => {
	const router = useRouter()

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

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		setIsLoading(true)

		const signInResponse: SignInResponse | undefined = await signIn(
			'credentials',
			{
				...data,
				redirect: false,
			}
		)

		if (signInResponse?.ok) {
			setIsLoading(false)
			showToastSuccess('Logged in')
			router.push('/')
			router.refresh()
			return
		}

		if (signInResponse?.error) {
			setIsLoading(false)
			showToastError(null, signInResponse.error)
			return
		}
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

				<IconButtonWithText
					icon={FaGoogle}
					label='Sign in with Google'
					onClick={() => signIn('google')}
				/>

				<IconButtonWithText
					icon={FaGithub}
					label='Sign in with Github'
					onClick={() => signIn('github')}
				/>

				<p>
					Don't have an account?{' '}
					<span
						className='text-indigo-800 cursor-pointer'
						onClick={() => router.push('/register')}
					>
						Create one
					</span>
				</p>
			</Card>
		</div>
	)
}

export default LoginClient
