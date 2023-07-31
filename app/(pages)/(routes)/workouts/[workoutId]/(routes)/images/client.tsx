'use client'

import { Workout, WorkoutImages } from '@prisma/client'

interface WorkoutImagesClientProps {
	workout: Workout & {
		images: WorkoutImages | null
	}
}

export const WorkoutImagesClient = ({ workout }: WorkoutImagesClientProps) => {
	const onUpload = (result: any) => {
		console.log(result)
	}

	return <div></div>
}
