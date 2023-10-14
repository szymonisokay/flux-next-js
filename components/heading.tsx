'use client'

type Props = {
	title: string
	description?: string
}

export const Heading = ({ title, description }: Props) => {
	return (
		<div className='w-full'>
			<h2
				title={title}
				className='text-lg font-semibold leading-tight tracking-tight'
			>
				{title}
			</h2>
			<p
				title={description}
				className='text-sm leading-tight tracking-tight truncate whitespace-pre-wrap text-secondary'
			>
				{description}
			</p>
		</div>
	)
}
