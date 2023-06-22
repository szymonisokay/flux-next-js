import { AvatarImage, Avatar as AvatarUi } from '../ui/avatar'

interface AvatarProps {
	src?: string | null
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
	return (
		<AvatarUi>
			{src ? (
				<AvatarImage src={src}></AvatarImage>
			) : (
				<AvatarImage src='../images/placeholder.jpg'></AvatarImage>
			)}
		</AvatarUi>
	)
}

export default Avatar
