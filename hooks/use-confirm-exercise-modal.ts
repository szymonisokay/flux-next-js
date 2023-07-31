import { create } from 'zustand'

interface UseConfirmExerciseStore {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
}

const useConfirmExerciseModal = create<UseConfirmExerciseStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}))

export default useConfirmExerciseModal
