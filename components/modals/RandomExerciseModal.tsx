import useRandomExerciseModal from '../../hooks/useRandomExerciseModal'
import Select from '../inputs/Select'
import { Button } from '../ui/button'
import Modal from './Modal'

import {
	ExerciseCategoryList,
	ExerciseMusclesList,
} from '@/config/exercise.config'
import { useForm } from 'react-hook-form'
import { RandomExerciseData } from '../../interfaces/exercises.interface'
import exerciseService from '../../services/exerciseService'
import Heading from '../ui/Heading'

import { zodResolver } from '@hookform/resolvers/zod'
import { Exercise } from '@prisma/client'
import { useState } from 'react'
import * as z from 'zod'
import ExerciseCard from '../exercises/ExerciseCard'
import { Icons } from '../icons'
import { Form, FormField, FormItem, FormLabel } from '../ui/form'

const formSchema = z.object({
	category: z.string().optional(),
	muscle: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface RandomExerciseModalProps {
	onGenerateRandomExercise: (rowId: string, exerciseId: string) => void
}

const RandomExerciseModal: React.FC<RandomExerciseModalProps> = ({}) => {
	const { isOpen, onClose, rowId } = useRandomExerciseModal()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [exercise, setExercise] = useState<Exercise | null>(null)

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			category: '',
			muscle: '',
		},
	})

	const onGenerateRandomExercise = async (data: FormValues) => {
		try {
			setIsLoading(true)
			const exercise = await exerciseService.getRandomExercise(
				data as RandomExerciseData
			)

			setExercise(exercise)
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
			// form.reset()
		}
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose} title='Random exercise'>
			<div className='flex flex-col gap-4'>
				<Heading
					title='Random exercise'
					subtitle='Generate next exercise for your workout'
				/>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onGenerateRandomExercise)}
						className='flex flex-col gap-y-4'
					>
						<FormField
							control={form.control}
							name='category'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<Select
										onValueChange={field.onChange}
										items={ExerciseCategoryList}
										placeholder='Select category'
										value={field.value}
										disabled={isLoading}
									/>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='muscle'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Muscle</FormLabel>
									<Select
										onValueChange={field.onChange}
										items={ExerciseMusclesList}
										placeholder='Select muscle'
										value={field.value}
										disabled={isLoading}
									/>
								</FormItem>
							)}
						/>
						<Button
							className='w-full'
							type='submit'
							disabled={isLoading}
						>
							{isLoading && (
								<Icons.spinner className='w-4 h-4 mr-2 animate-spin' />
							)}{' '}
							Generate
						</Button>
					</form>
				</Form>

				{exercise && (
					<>
						<p className='text-xl font-semibold'>
							Generated exercise
						</p>
						<ExerciseCard {...exercise} />
					</>
				)}
			</div>
		</Modal>
	)
}

export default RandomExerciseModal
