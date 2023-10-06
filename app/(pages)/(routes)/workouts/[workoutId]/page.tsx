import { redirectToSignIn } from '@clerk/nextjs'

import { PageHeader } from '@/components/page-header'
import { getProfile } from '@/lib/get-profile'
import { prisma } from '@/lib/prisma'

import { Client } from './client'

const WorkoutPage = async ({ params }: { params: { workoutId: string } }) => {
	const profile = await getProfile()

	if (!profile) {
		return redirectToSignIn()
	}

	const workout = await prisma.workout.findUnique({
		where: {
			id: params.workoutId,
		},
	})

	return (
		<>
			<PageHeader
				title='Create workout'
				description='Fill in all required details'
			/>

			<Client workout={workout} />
		</>
	)
}

export default WorkoutPage
