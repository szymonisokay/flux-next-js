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
import { showToastError } from '@/utils/showToast'

const formSchema = z.object({
	email: z.string().email(),
	password: z.string().min(4),
})

type FormValues = z.infer<typeof formSchema>

const LoginClient = () => {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = async (data: FormValues) => {
		setIsLoading(true)

		const signInResponse = await signIn('credentials', {
			...data,
			redirect: false,
		})

		router.refresh()

		if (signInResponse?.ok) {
			setIsLoading(false)
			return
		}

		if (signInResponse?.error) {
			setIsLoading(false)
			showToastError(null, signInResponse.error)
			return
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
					<CardTitle>Welcome back to Flux</CardTitle>
					<CardDescription>
						Login into your account or create new one
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<div className='grid gap-4'>
								<div className='grid gap-2'>
									<FormField
										control={form.control}
										name='email'
										render={({ field }) => (
											<FormItem>
												<FormLabel htmlFor='email'>
													Email
												</FormLabel>
												<FormControl>
													<Input
														{...field}
														id='email'
														placeholder='Enter your email'
														type='email'
														autoCapitalize='none'
														autoComplete='email'
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
												<FormLabel htmlFor='password'>
													Password
												</FormLabel>
												<FormControl>
													<Input
														{...field}
														id='password'
														placeholder='Password'
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
									Sign In
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
						onClick={() => socialLogin('google')}
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
					Don't have an account?{' '}
					<Link
						href='/register'
						className='underline underline-offset-4 hover:text-primary'
					>
						Sign up
					</Link>{' '}
				</p>
			</div>
		</div>
	)
}

export default LoginClient
