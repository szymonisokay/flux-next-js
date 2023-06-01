'use client'

interface CardProps {
	children: React.ReactNode
	center?: boolean
}

const Card: React.FC<CardProps> = ({ children, center }) => {
	return (
		<div
			className={`p-4 rounded-md shadow-md bg-white min-w-[90%] flex flex-col gap-4 ${
				center ? 'items-center' : 'items-start'
			} 
    `}
		>
			{children}
		</div>
	)
}

export default Card
