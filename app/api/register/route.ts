import { generateAvatarUrl } from '../../utils/generateAvatar'
import prisma from '@/app/libs/prismadb'

import { NextResponse } from 'next/server'
import { hash } from 'bcrypt'
import { throwError } from '../../utils/error'
import { MessageResponse } from '../../interfaces/messageResponse.interface'
import { User } from '@prisma/client'

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
