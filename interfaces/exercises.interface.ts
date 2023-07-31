export interface SelectedExercise {
	rowId: string
	exerciseId?: string
	reps?: number
	sets?: number
	isEditing: boolean
}

export interface ChangedExercise {
	rowId: string
	exerciseId: string
}

export interface ExerciseName {
	id: string
	exercise_name: string
}
