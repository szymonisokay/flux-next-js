import Image from 'next/image'
import placeholderAvatar from '../../../public/images/placeholder.jpg'

interface AvatarProps {
	src?: string | null
	onClick?: () => void
	small?: boolean
	rounded?: boolean
}

const Avatar: React.FC<AvatarProps> = ({ src, onClick, small, rounded }) => {
	return (
		<Image
			onClick={onClick}
			src={src || placeholderAvatar}
			alt='Avatar'
			width={small ? 24 : 36}
			height={small ? 24 : 36}
			className={`
      ${onClick ? 'cursor-pointer' : 'cursor-auto'}
      ${rounded ? 'rounded-full' : 'rounded-md'} 
      `}
		/>
	)
}

export default Avatar
