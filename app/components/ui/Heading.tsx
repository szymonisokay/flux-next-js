'use client'

interface HeadingProps {
	title: string
	subtitle?: string
	center?: boolean
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
	return (
		<div className={`${center ? 'text-center' : 'text-left'} w-full`}>
			<div className='text-xl font-semibold text-neutral-900'>{title}</div>
			<div className='text-sm text-neutral-500'>{subtitle}</div>
		</div>
	)
}

export default Heading
