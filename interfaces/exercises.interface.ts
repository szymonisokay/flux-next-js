import { ExerciseTarget } from '@prisma/client'

export interface ExerciseShortInfo {
	id: string
	target: ExerciseTarget
	Category: string | null
	exercise_name: string | null
	Difficulty: string | null
	videoURL: string[]
}

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
