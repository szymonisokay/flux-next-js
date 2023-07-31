'use client'

import { Exercise } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

import ExerciseMetaData from '@/components/exercises/exercise-meta-data'
import { Icons } from '@/components/icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '../../lib/utils'

interface ExerciseCardProps {
	exercise: Exercise
	selectable?: boolean
	selectedId?: string
	vertical?: boolean
	onSelectedChange?: (exerciseId: string) => void
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
	exercise,
	selectable,
	selectedId,
	vertical,
	onSelectedChange,
}) => {
	const onSetSelectedId = (id: string) => {
		if (!selectable || !onSelectedChange) return

		onSelectedChange(id)
	}

	if (vertical) {
		return (
			<div
				className={cn(
					'flex w-full p-4 border rounded-md gap-x-4 relative',
					selectedId === exercise.id && 'border-primary'
				)}
			>
				<Image
					priority
					src={exercise.gifUrl}
					alt={exercise.name}
					className='rounded-md cursor-pointer'
					width={100}
					height={100}
				/>

				<div className='relative flex flex-col flex-wrap w-full gap-y-2'>
					<h3
						title={exercise.name}
						className='py-0 text-xl font-bold'
					>
						{exercise.name}
					</h3>

					<ExerciseMetaData exercise={exercise} />

					{selectable && (
						<Button
							variant='outline'
							size='sm'
							className='mt-2'
							onClick={() => onSetSelectedId(exercise.id)}
						>
							{selectedId === exercise.id ? (
								<span>Selected</span>
							) : (
								<span>Add exercise</span>
							)}
						</Button>
					)}
				</div>
				{selectedId === exercise.id && (
					<Button size='sm' className='absolute top-2 left-2'>
						<Icons.check className='w-4 h-4 text-primary-foreground' />
					</Button>
				)}
			</div>
		)
	}

	return (
		<div
			className={`w-full p-4  rounded-md flex flex-col gap-4 
			${selectable ? 'cursor-pointer' : 'cursor-auto'}
			${selectedId === exercise.id ? 'border-card-foreground border-[1px]' : 'border'}
		`}
			onClick={() => onSetSelectedId(exercise.id)}
		>
			<div className='relative'>
				<div className='relative h-[300px]'>
					<Image
						priority
						fill
						src={exercise.gifUrl}
						alt={exercise.name}
						className='rounded-md'
					/>
				</div>

				{selectedId === exercise.id && (
					<Badge className='absolute left-4 top-4'>
						<Icons.check size={16} />
					</Badge>
				)}
			</div>

			<h3
				title={exercise.name}
				className='py-0 text-xl font-bold truncate'
			>
				{exercise.name}
			</h3>

			<ExerciseMetaData exercise={exercise} />

			<Button>
				<Link prefetch={false} href={`/exercises/${exercise.id}`}>
					Show exercise
				</Link>
			</Button>
		</div>
	)
}

export default ExerciseCard
