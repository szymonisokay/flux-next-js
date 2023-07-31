import { SetModel } from '@prisma/client'
import { create } from 'zustand'

interface UseExerciseSetsModalStore {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
	sets: SetModel[] | null
	setSets: (sets: SetModel[] | null) => void
}

export const UseExerciseSetsModal = create<UseExerciseSetsModalStore>(
	(set) => ({
		isOpen: false,
		onOpen: () => set({ isOpen: true }),
		onClose: () => set({ isOpen: false }),
		sets: null,
		setSets: (sets) => set({ sets }),
	})
)
