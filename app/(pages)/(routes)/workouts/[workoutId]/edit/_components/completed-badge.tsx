import { Completed } from '@/components/completed'
import { prisma } from '@/lib/prisma'

type Props = {
	workoutId: string
}

export const CompletedBadge = async ({ workoutId }: Props) => {
	const workout = await prisma.workout.findFirst({
		where: {
			id: workoutId,
			completed: true,
		},
	})

	return <>{workout && <Completed icon size='sm' variant='colored' />}</>
}
