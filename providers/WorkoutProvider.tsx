import React from 'react'
import AddWorkoutModal from '../components/modals/AddWorkoutModal'
import SelectExerciseModal from '../components/modals/SelectExerciseModal'

interface WorkoutProviderProps {
	children: React.ReactNode
}

const WorkoutProvider: React.FC<WorkoutProviderProps> = ({ children }) => {
	return (
		<>
			<AddWorkoutModal />
			<SelectExerciseModal />

			{children}
		</>
	)
}

export default WorkoutProvider
