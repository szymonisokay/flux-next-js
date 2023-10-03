'use client'

import { ImagePlusIcon } from 'lucide-react'
import { CldUploadWidget } from 'next-cloudinary'

import { Button } from '@/components/ui/button'

type Props = {
	value: string[]
	onChange: (url: string) => void
}

export const ImageUpload = ({ value, onChange }: Props) => {
	const onUpload = (result: any) => {
		console.log(result)
	}

	return (
		<CldUploadWidget onUpload={onUpload} uploadPreset='pse2a9de'>
			{({ open }) => {
				const onClick = () => {
					open()
				}

				return (
					<Button variant='secondary' onClick={onClick}>
						<ImagePlusIcon className='w-4 h-4 mr-2' />
						<span>Upload an image</span>
					</Button>
				)
			}}
		</CldUploadWidget>
	)
}
