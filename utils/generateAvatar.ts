import { createHash } from 'crypto'

export const generateAvatarUrl = (email: string) => {
	const emailHash = createHash('md5').update(email).digest('hex')

	return `https://www.gravatar.com/avatar/${emailHash}?d=identicon`
}
