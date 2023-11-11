import { Exercise } from '@prisma/client'
import { create } from 'zustand'

type ModalType = 'imagePreview' | 'addExercise' | 'exerciseFilters'

type ModalData = {
	imageUrl?: string
	exercise?: Exercise
}

type UseModalStore = {
	open: boolean
	data?: ModalData | null
	type: ModalType | null
	setOpen: (type: ModalType, data?: ModalData) => void
	setClose: () => void
}

export const useModal = create<UseModalStore>((set) => ({
	open: false,
	data: null,
	type: null,
	setOpen: (type, data) => set({ open: true, data, type }),
	setClose: () => set({ open: false, data: null, type: null }),
}))
