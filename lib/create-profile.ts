import { currentUser } from '@clerk/nextjs'

import { prisma } from '@/lib/prisma'

export const createProfile = async () => {
	const user = await currentUser()

	if (!user) return null

	const profile = await prisma.profile.findUnique({
		where: {
			userId: user.id,
		},
	})

	if (profile) {
		return profile
	}

	const newProfile = await prisma.profile.create({
		data: {
			userId: user.id,
			name: `${user.firstName} ${user.lastName}`,
			email: user.emailAddresses[0].emailAddress,
			image: user.imageUrl,
		},
	})

	return newProfile
}
