'use client'

import axios from 'axios'
import { CopyIcon, EditIcon, MoreVerticalIcon, TrashIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type Props = {
	workoutId: string
}

export const WorkoutCardMenu = ({ workoutId }: Props) => {
	const router = useRouter()

	const onDuplicateWorkout = async () => {
		try {
			await axios.post(`/api/workouts/${workoutId}/duplicate`)

			router.refresh()
		} catch (error) {
			console.log(error)
		}
	}

	const onDeleteWorkout = async () => {
		try {
			await axios.delete(`/api/workouts/${workoutId}`)

			router.refresh()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='ghost'
					size='icon'
					className='w-8 h-8 hover:bg-background'
				>
					<MoreVerticalIcon className='w-4 h-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuGroup>
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuItem
						onClick={() =>
							router.push(`/workouts/${workoutId}/edit`)
						}
					>
						<EditIcon className='w-4 h-4 mr-2' />
						Edit
					</DropdownMenuItem>
					<DropdownMenuItem onClick={onDuplicateWorkout}>
						<CopyIcon className='w-4 h-4 mr-2' />
						Duplicate
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={onDeleteWorkout}
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
