'use client'

import { Icons } from '../icons'

interface ExerciseMetaDataProps {
	category: string | null
	difficulty: string | null
	muscle: string
}

const ExerciseMetaData: React.FC<ExerciseMetaDataProps> = ({
	category,
	difficulty,
	muscle,
}) => {
	const getClass = () => {
		if (difficulty === 'Beginner') {
			return 'text-green-600'
		} else if (difficulty === 'Advanced') {
			return 'text-orange-400'
		} else {
			return 'text-red-600'
		}
	}

	return (
		<div className='flex items-center justify-between px-1'>
			<div className='flex items-center gap-2'>
				<Icons.dumbbell size={16} />
				<p className='text-base text-muted-foreground'>{category}</p>
			</div>

			<div className='flex items-center gap-1'>
				<Icons.person size={22} />
				<p className='text-base text-muted-foreground'>{muscle}</p>
			</div>

			<div className={`hidden xs:flex items-center gap-1 ${getClass()}`}>
				<Icons.flame size={18} />
				<p className='text-base'>{difficulty}</p>
			</div>
		</div>
	)
}

export default ExerciseMetaData
