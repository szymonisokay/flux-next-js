import { create } from 'zustand'

interface UseAddWorkoutStore {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
	date?: Date
	addDate: (date: Date) => void
}

const useAddWorkoutModal = create<UseAddWorkoutStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
	addDate: (date: Date) => set({ date }),
}))

export default useAddWorkoutModal
