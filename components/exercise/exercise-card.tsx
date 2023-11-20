'use client'

import { Exercise, Set, Training } from '@prisma/client'
import axios from 'axios'
import {
	ClockIcon,
	CopyIcon,
	CrownIcon,
	DumbbellIcon,
	EditIcon,
	ExpandIcon,
	FlameIcon,
	HandIcon,
	MoreVerticalIcon,
	TrashIcon,
} from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { createContext, useContext } from 'react'

import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useModal } from '@/hooks/use-modal'
import { cn } from '@/lib/utils'

type ExerciseCardContextType = {
	exercise: Exercise
}

const ExerciseCardContext = createContext<ExerciseCardContextType | null>(null)

export const useExerciseCard = () => {
	const context = useContext(ExerciseCardContext)

	if (!context) {
		throw new Error(
			'useExerciseCard must be used within an ExerciseCardProvider'
		)
	}

	return context
}

type ExerciseCardProps = {
	exercise: Exercise
	children?: React.ReactNode
	slot?: React.ReactNode
	highlight?: boolean
	showPreview?: boolean
}

export const ExerciseCard = ({
	exercise,
	children,
	slot,
	highlight,
	showPreview = true,
}: ExerciseCardProps) => {
	const { setOpen } = useModal()

	const { name, gifUrl } = exercise

	return (
		<ExerciseCardContext.Provider value={{ exercise }}>
			<div
				className={cn(
					'flex items-start p-4 border rounded-md gap-x-4',
					highlight && 'bg-accent'
				)}
			>
				<div className='relative overflow-hidden rounded-md w-28 h-28 shrink-0'>
					<Image priority fill src={gifUrl} alt={name} sizes='96px' />
					{showPreview && (
						<Button
							variant='colored'
							size='icon'
							className='absolute z-10 w-7 h-7 top-1 left-1'
							onClick={() =>
								setOpen('imagePreview', { imageUrl: gifUrl })
							}
						>
							<ExpandIcon className='w-4 h-4' />
						</Button>
					)}
				</div>

				<div className='flex flex-col gap-4'>
					<div className='flex items-center justify-between gap-4'>
						<Heading title={name} />
						{slot}
					</div>

					{children}
				</div>
			</div>
		</ExerciseCardContext.Provider>
	)
}

const ExerciseCardDetails = () => {
	const { exercise } = useExerciseCard()

	const { bodyPart, equipment, target } = exercise
	return (
		<div className='flex flex-wrap gap-x-8 gap-y-4'>
			<div className='flex items-center text-secondary'>
				<HandIcon className='w-4 h-4 mr-2' />
				<span className='text-sm leading-none'>{bodyPart}</span>
			</div>

			<div className='flex items-center text-secondary'>
				<DumbbellIcon className='w-4 h-4 mr-2' />
				<span className='text-sm leading-none'>{equipment}</span>
			</div>

			<div className='flex items-center text-secondary'>
				<FlameIcon className='w-4 h-4 mr-2' />
				<span className='text-sm leading-none'>{target}</span>
			</div>
		</div>
	)
}

ExerciseCard.Details = ExerciseCardDetails

const ExerciseCardSelectButton = () => {
	const { exercise } = useExerciseCard()
	const { setOpen } = useModal()

	return (
		<Button
			variant='outline'
			size='sm'
			onClick={() => setOpen('manageExercise', { exercise })}
		>
			Select
		</Button>
	)
}

ExerciseCard.SelectButton = ExerciseCardSelectButton

type ExerciseCardMenuProps = {
	training: Training & {
		exercise: Exercise
		sets: Set[]
	}
}

const ExerciseCardMenu = ({ training }: ExerciseCardMenuProps) => {
	const params = useParams()
	const router = useRouter()
	const { exercise } = useExerciseCard()
	const { setOpen } = useModal()

	const onDuplicateTraining = async () => {
		try {
			await axios.post(
				`/api/workouts/${params?.workoutId}/trainings/${training.id}/duplicate`
			)

			router.refresh()
		} catch (error) {
			console.log(error)
		}
	}

	const onDeleteTraining = async () => {
		try {
			await axios.delete(
				`/api/workouts/${params?.workoutId}/trainings/${training.id}`
			)

			router.refresh()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='icon' className='shrink-0'>
					<MoreVerticalIcon className='w-4 h-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuGroup>
					<DropdownMenuItem
						onClick={() =>
							setOpen('manageExercise', { exercise, training })
						}
					>
						<EditIcon className='w-4 h-4 mr-2' />
						Edit
					</DropdownMenuItem>
					<DropdownMenuItem onClick={onDuplicateTraining}>
						<CopyIcon className='w-4 h-4 mr-2' />
						Duplicate
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={onDeleteTraining}
						className='text-red-600 hover:!text-red-600 hover:!bg-red-600/10'
					>
						<TrashIcon className='w-4 h-4 mr-2' />
						Delete
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

ExerciseCard.Menu = ExerciseCardMenu

type ExerciseCardWorkoutInfoProps = {
	duration?: string | null
	sets?: Set[]
}

const ExerciseCardWorkoutInfo = ({
	sets,
	duration,
}: ExerciseCardWorkoutInfoProps) => {
	useExerciseCard()

	return (
		<>
			{duration && (
				<div className='flex justify-between gap-x-4'>
					<div className='flex items-center'>
						<ClockIcon className='w-4 h-4 mr-2' />
						<p className='text-sm font-semibold'>Duration</p>
					</div>
					<p className='text-sm text-secondary'>{duration}</p>
				</div>
			)}
			{!!sets?.length && (
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant='ghost'
							size='sm'
							className='justify-start'
						>
							<CrownIcon className='w-4 h-4 mr-2' />
							Sets
							<span className='ml-auto text-secondary'>
								({sets?.length})
							</span>
						</Button>
					</PopoverTrigger>
					<PopoverContent align='end'>
						<Heading
							title='Sets'
							description='Your sets in this exercise'
						/>
						<Separator className='my-4' />

						{sets?.map((set, index) => (
							<div
								key={set.id}
								className='flex items-start pb-4 last-of-type:pb-0'
							>
								<div className='flex items-center justify-center w-auto h-10 px-4 text-sm font-semibold rounded-md bg-accent'>
									<span>{++index}. Set</span>
								</div>
								<div className='flex items-center ml-auto gap-x-8'>
									<div>
										<p className='text-sm'>Reps</p>
										<p className='text-sm text-secondary'>
											{set.reps}
										</p>
									</div>
									<div>
										<p className='text-sm'>Weight</p>
										<p className='text-sm text-secondary'>
											{set.weight} kg
										</p>
									</div>
								</div>
							</div>
						))}
					</PopoverContent>
				</Popover>
			)}
		</>
	)
}

ExerciseCard.WorkoutInfo = ExerciseCardWorkoutInfo

type ExerciseCardSkeletonProps = {
	showButton?: boolean
	showSets?: boolean
}

const ExerciseCardSkeleton = ({
	showButton,
	showSets,
}: ExerciseCardSkeletonProps) => {
	return (
		<div className='flex gap-4 p-4 border-[1px] border-accent/50 rounded-md'>
			<Skeleton className='rounded-md w-28 h-28' />

			<div>
				<Skeleton className='w-40 h-6 mb-4' />
				<div className='flex flex-wrap gap-4 mb-4'>
					<Skeleton className='w-24 h-4' />
					<Skeleton className='w-10 h-4' />
					<Skeleton className='w-16 h-4' />
				</div>
				{showButton && <Skeleton className='w-full h-10' />}
				{showSets && (
					<div className='flex items-center justify-between mt-8'>
						<Skeleton className='w-20 h-4' />
						<Skeleton className='w-10 h-4' />
					</div>
				)}
			</div>
		</div>
	)
}

ExerciseCard.Skeleton = ExerciseCardSkeleton
