'use client'

interface HeadingProps {
	title: string
	subtitle?: string
	center?: boolean
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
	return (
		<div className={`${center ? 'text-center' : 'text-left'} w-full`}>
			<div className='text-xl font-semibold leading-none tracking-tight text-primary'>
				{title}
			</div>
			<div className='text-sm text-muted-foreground'>{subtitle}</div>
		</div>
	)
}

export default Heading
