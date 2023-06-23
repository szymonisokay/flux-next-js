'use client'

import Link from 'next/link'
import { ExerciseShortInfo } from '../../interfaces/exercises.interface'
import Video from '../custom/Video'
import { Icons } from '../icons'
import { Badge } from '../ui/badge'

interface ExerciseCardProps extends ExerciseShortInfo {
	selectable?: boolean
	selectedId?: string
	onSelectedChange?: (exerciseId: string) => void
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
	id,
	exercise_name,
	videoURL,
	Category,
	Difficulty,
	target,
	selectable,
	selectedId,
	onSelectedChange,
}) => {
	const onSetSelectedId = (id: string) => {
		if (!selectable) return

		const onSetId = onSelectedChange || null

		if (!onSetId) return

		onSetId(id)
	}

	return (
		<div
			className={`w-full p-4 border rounded-md 
		${selectable ? 'cursor-pointer' : 'cursor-auto'}
		`}
			onClick={() => onSetSelectedId(id)}
		>
			<div className='relative'>
				<Video src={videoURL[0]} />

				<Badge className='absolute right-4 top-4'>{Difficulty}</Badge>

				{selectedId === id && (
					<Badge className='absolute left-4 top-4'>
						<Icons.check size={16} />
					</Badge>
				)}
			</div>

			<div
				title={exercise_name ?? ''}
				className='py-5 text-xl font-semibold leading-none truncate'
			>
				{selectable ? (
					<p>{exercise_name}</p>
				) : (
					<Link prefetch={false} href={`/exercises/${id}`}>
						{exercise_name}
					</Link>
				)}
			</div>

			<div className='flex gap-4'>
				<div className='flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-card-foreground'>
					<Icons.dumbbell
						className='text-primary-foreground'
						size={16}
					/>

					<p className='text-sm text-primary-foreground'>
						{Category}
					</p>
				</div>

				<div className='flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-card-foreground'>
					<Icons.person
						className='text-primary-foreground'
						size={18}
					/>

					<p className='text-sm text-primary-foreground'>
						{target?.Primary[0]}
					</p>
				</div>
			</div>
		</div>
	)
}

export default ExerciseCard
