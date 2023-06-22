'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import { ExerciseShortInfo } from '../../interfaces/exercises.interface'
import { cn } from '../../lib/utils'
import { Button } from '../ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '../ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

interface ExerciseSelectProps {
	exercises: ExerciseShortInfo[]
	exerciseId: string
	onExerciseChange: (exerciseId: string) => void
}

const ExerciseSelect: React.FC<ExerciseSelectProps> = ({
	exercises,
	exerciseId,
	onExerciseChange,
}) => {
	const [open, setOpen] = useState<boolean>(false)

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					role='combobox'
					aria-expanded={open}
					className='justify-between w-[100%] mt-2'
				>
					{exerciseId
						? exercises.find(
								(exercise) => exercise.id === exerciseId
						  )?.exercise_name
						: 'Select Exercise...'}
					<ChevronsUpDown className='w-4 h-4 ml-2 opacity-50 shrink-0' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[calc(100%-64px)] p-0 mx-auto'>
				<Command className='max-h-80'>
					<CommandInput placeholder='Search exercise...' />
					<CommandEmpty>No exercises found.</CommandEmpty>
					<CommandGroup className='overflow-y-auto'>
						{exercises.map((exercise) => (
							<CommandItem
								key={exercise.id}
								value={exercise.id}
								onSelect={(currentValue) => {
									onExerciseChange(
										currentValue === exerciseId
											? ''
											: currentValue
									)
									setOpen(false)
								}}
							>
								<Check
									className={cn(
										'mr-2 h-4 w-4',
										exerciseId === exercise.id
											? 'opacity-100'
											: 'opacity-0'
									)}
								/>
								{exercise.exercise_name}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

export default ExerciseSelect
