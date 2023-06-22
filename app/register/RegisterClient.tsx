'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import Logo from '../../components/Logo'
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

	const socialLogin = useCallback(
		async (provider: string) => {
			setIsLoading(true)

			await signIn(provider)
		},
		[signIn]
	)

	return (
		<div className='relative mx-auto px-4 flex w-full h-full flex-col justify-center space-y-6 sm:w-[350px]'>
			<div className='pb-10 mx-auto'>
				<Logo />
			</div>

			<div className='flex flex-col space-y-2 text-center'>
				<h1 className='text-2xl font-semibold tracking-tight'>
					Create your account
				</h1>
				<p className='text-sm text-muted-foreground'>
					Enter your creadentials and begin with Flux
				</p>
			</div>

			<div className='grid gap-6'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='grid gap-4'>
						<div className='grid gap-2'>
							<Label className='sr-only' htmlFor='email'>
								Username
							</Label>
							<Input
								id='name'
								placeholder='Username'
								type='text'
								autoCapitalize='none'
								autoCorrect='off'
								disabled={isLoading}
								register={register}
								errors={errors}
							/>
						</div>
						<div className='grid gap-2'>
							<Label className='sr-only' htmlFor='email'>
								Email
							</Label>
							<Input
								id='email'
								placeholder='Email'
								type='email'
								autoCapitalize='none'
								autoComplete='email'
								autoCorrect='off'
								disabled={isLoading}
								register={register}
								errors={errors}
							/>
						</div>
						<div className='grid gap-2'>
							<Label className='sr-only' htmlFor='email'>
								Password
							</Label>
							<Input
								id='password'
								placeholder='Password'
								type='password'
								autoCapitalize='none'
								autoCorrect='off'
								disabled={isLoading}
								register={register}
								errors={errors}
							/>
						</div>
						<Button disabled={isLoading}>
							{isLoading && (
								<Icons.spinner className='w-4 h-4 mr-2 animate-spin' />
							)}
							Sign Up
						</Button>
					</div>
				</form>
				<div className='relative'>
					<div className='absolute inset-0 flex items-center'>
						<span className='w-full border-t' />
					</div>
					<div className='relative flex justify-center text-xs uppercase'>
						<span className='px-2 bg-background text-muted-foreground'>
							Or continue with
						</span>
					</div>
				</div>
				<div className='flex gap-4'>
					<Button
						variant='outline'
						type='button'
						disabled={isLoading}
						className='flex-1'
						onClick={() => socialLogin('github')}
					>
						{isLoading ? (
							<Icons.spinner className='w-4 h-4 mr-2 animate-spin' />
						) : (
							<Icons.gitHub className='w-4 h-4 mr-2' />
						)}{' '}
						Github
					</Button>
					<Button
						variant='outline'
						type='button'
						disabled={isLoading}
						className='flex-1'
						onClick={() => socialLogin('github')}
					>
						{isLoading ? (
							<Icons.spinner className='w-4 h-4 mr-2 animate-spin' />
						) : (
							<Icons.google className='w-4 h-4 mr-2' />
						)}{' '}
						Google
					</Button>
				</div>

				<p className='px-8 text-sm text-center text-muted-foreground'>
					Already have an account?{' '}
					<Link
						href='/login'
						className='underline underline-offset-4 hover:text-primary'
					>
						Sign in
					</Link>{' '}
				</p>
			</div>
		</div>
	)
}

export default RegisterClient
