import { create } from 'zustand'

interface UseMenuStore {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
}

const useMenuModal = create<UseMenuStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}))

export default useMenuModal
