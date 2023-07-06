'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import Logo from '@/components/Logo'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import authService from '@/services/authService'
import { showToastError, showToastSuccess } from '@/utils/showToast'

const formSchema = z.object({
	name: z.string().min(3),
	email: z.string().email(),
	// TODO: Add regex to validate strong password
	password: z.string().min(4),
})

type FormValues = z.infer<typeof formSchema>

const RegisterClient = () => {
	const router = useRouter()

	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	})

	const onSubmit = async (data: FormValues) => {
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
		<div className='relative mx-auto px-4 flex w-full h-full flex-col justify-center space-y-6 max-w-[400px]'>
			<Logo src='' alt='' className='pb-2 mx-auto' />
			<Card>
				<CardHeader>
					<CardTitle>Create your account</CardTitle>
					<CardDescription>
						Enter your creadentials and begin with Flux
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<div className='grid gap-4'>
								<div className='grid gap-2'>
									<FormField
										control={form.control}
										name='name'
										render={({ field }) => (
											<FormItem>
												<FormLabel htmlFor='name'>
													Username
												</FormLabel>
												<FormControl>
													<Input
														{...field}
														className='mt-0'
														id='name'
														placeholder='Enter your username'
														type='text'
														autoCapitalize='none'
														autoCorrect='off'
														disabled={isLoading}
													/>
												</FormControl>
											</FormItem>
										)}
									/>
								</div>
								<div className='grid gap-2'>
									<FormField
										control={form.control}
										name='email'
										render={({ field }) => (
											<FormItem>
												<FormLabel htmlFor='name'>
													Email
												</FormLabel>
												<FormControl>
													<Input
														{...field}
														id='email'
														placeholder='Enter your email'
														type='email'
														autoCapitalize='email'
														autoCorrect='off'
														disabled={isLoading}
													/>
												</FormControl>
											</FormItem>
										)}
									/>
								</div>
								<div className='grid gap-2'>
									<FormField
										control={form.control}
										name='password'
										render={({ field }) => (
											<FormItem>
												<FormLabel htmlFor='name'>
													Password
												</FormLabel>
												<FormControl>
													<Input
														{...field}
														id='password'
														placeholder='Enter your password'
														type='password'
														autoCapitalize='none'
														autoCorrect='off'
														disabled={isLoading}
													/>
												</FormControl>
											</FormItem>
										)}
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
					</Form>
				</CardContent>
			</Card>
			<div className='grid gap-6'>
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
