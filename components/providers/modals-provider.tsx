'use client'

import { ExerciseFiltersModal } from '@/components/modals/exercise-filters-modal'
import { ImagePreviewModal } from '@/components/modals/image-preview-modal'
import { ManageExerciseModal } from '@/components/modals/manage-exercise-modal'

export const ModalsProvider = () => {
	return (
		<>
			<ImagePreviewModal />
			<ManageExerciseModal />
			<ExerciseFiltersModal />
		</>
	)
}
