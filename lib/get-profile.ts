import { auth } from '@clerk/nextjs'

import { prisma } from '@/lib/prisma'

export const getProfile = async () => {
	const { userId } = auth()

	if (!userId) {
		return null
	}

	const profile = await prisma.profile.findUnique({
		where: {
			userId,
		},
	})

	return profile
}
