import { create } from 'zustand'

interface UseRandomExerciseStore {
	isOpen: boolean
	rowId?: string
	onOpen: () => void
	onClose: () => void
	setRowId: (rowId: string) => void
}

const useRandomExerciseModal = create<UseRandomExerciseStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
	setRowId: (rowId: string) => set({ rowId }),
}))

export default useRandomExerciseModal
