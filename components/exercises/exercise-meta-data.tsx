'use client'

import { Exercise } from '@prisma/client'
import { Icons } from '../icons'
import { Badge } from '../ui/badge'

interface ExerciseMetaDataProps {
	exercise: Exercise
}

const ExerciseMetaData: React.FC<ExerciseMetaDataProps> = ({ exercise }) => {
	return (
		<div className='flex flex-wrap gap-x-2 gap-y-2'>
			<Badge variant='secondary' className='flex items-center gap-2 py-1'>
				<Icons.person size={16} />
				<span>{exercise.bodyPart}</span>
			</Badge>

			<Badge variant='secondary' className='flex items-center gap-2 py-1'>
				<Icons.zap size={16} />
				<span>{exercise.target}</span>
			</Badge>

			<Badge variant='secondary' className='flex items-center gap-2 py-1'>
				<Icons.person size={16} />
				<span>{exercise.equipment}</span>
			</Badge>
		</div>
	)
}

export default ExerciseMetaData
