import { create } from 'zustand'

interface UseSelectExerciseStore {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
}

const useSelectExerciseModal = create<UseSelectExerciseStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}))

export default useSelectExerciseModal
