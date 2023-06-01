import { toast } from 'react-hot-toast'

export const showToastSuccess = (message: string) => {
	return toast.success(message)
}

export const showToastError = (error: any, message?: string) => {
	const errorMessage = error?.response?.data?.error?.message || message

	return toast.error(errorMessage)
}
