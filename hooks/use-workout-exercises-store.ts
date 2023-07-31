import { create } from 'zustand'

interface UseWorkoutExercisesStore {
	// exercise: WorkoutExercise | null,
	// setExercise: (exercise: WorkoutExercise | null) => void
	exerciseId: string | null
	setExerciseId: (exerciseId: string | null) => void
}

export const useWorkoutExerciseStore = create<UseWorkoutExercisesStore>(
	(set) => ({
		exerciseId: null,
		setExerciseId: (exerciseId) => set({ exerciseId }),
	})
)
