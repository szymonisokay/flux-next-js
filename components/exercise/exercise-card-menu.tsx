'use client'

import { CopyIcon, MoreVerticalIcon, TrashIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'

type Props = {
	trainingId: string
}

export const ExerciseCardMenu = ({ trainingId }: Props) => {
	const params = useParams()
	const router = useRouter()

	const onDuplicateTraining = async () => {
		try {
			await axios.post(
				`/api/workouts/${params.workoutId}/trainings/${trainingId}/duplicate`
			)

			router.refresh()
		} catch (error) {
			console.log(error)
		}
	}

	const onDeleteTraining = async () => {
		try {
			await axios.delete(
				`/api/workouts/${params.workoutId}/trainings/${trainingId}`
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
