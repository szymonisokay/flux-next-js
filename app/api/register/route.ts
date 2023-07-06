import prisma from '@/lib/prismadb'
import { generateAvatarUrl } from '../../../utils/generateAvatar'

import { User } from '@prisma/client'
import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'
import { MessageResponse } from '../../../interfaces/messageResponse.interface'
import { throwError } from '../../../utils/error'

export async function POST(request: Request) {
	const body = await request.json()

	const { email, name, password } = body
	if (!email || !name || !password) {
		return throwError('Provide all data', 400)
	}

	const userExists = await prisma.user.findUnique({ where: { email } })

	if (userExists) {
		return throwError('User already exists', 400)
	}

	const hashedPassword = await hash(password, 12)

	const user = await prisma.user.create({
		data: {
			email,
			name,
			image: generateAvatarUrl(email),
			password: hashedPassword,
			roles: ['User'],
		},
	})

	return NextResponse.json({
		message: 'User created',
		result: user,
	} as MessageResponse<User>)
}
