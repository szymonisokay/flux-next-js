import { NextResponse } from 'next/server'

export const throwError = (message: string, status: number = 500) => {
	return NextResponse.json({ error: { message } }, { status })
}
